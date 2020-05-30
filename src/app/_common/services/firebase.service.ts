import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators'

import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private _orders: AngularFirestoreCollection<any>
  private _users: AngularFirestoreCollection<any>
  private _admin: AngularFirestoreCollection<any>
  private _emails: AngularFirestoreCollection<any>

  constructor(
    private router: Router, 
    private fire: AngularFirestore,
    private shared: SharedService
  ) { 
    this._orders = fire.collection('orders');
    this._users = fire.collection('users');
    this._admin = fire.collection('admin');
    this._emails = fire.collection('emails');
  }

  set order(order: any) {
    this._orders.add(order);
  }

  set newEmailRegistration(email: string) {
    this._emails.add({ email, exists: true }).then(() => {
      
      this.shared.email = email;
      this.shared.emailData = { email, exists: true };

      this.shared.guardFactory = 1;
      this.router.navigate([ '/registration' ]).then(() => {
        this.shared.updateSource('progress', false);
      });
    });
  }

  newCustomerRegistration() {

    this.shared.updateSource('progress', true);

    const data = this.shared.userData;
    const emailData = this.shared.emailData;
    emailData.email = data.email;

    const $ = this._emails.snapshotChanges().pipe(
      map((res) => {

        res.forEach((emails) => {
          
          const email = emails.payload.doc;
          
          console.log(email.data().email, this.shared.email, {
            ...emailData,
            details: data
          });

          if (email.data().email === this.shared.email) {
            email.ref.delete();
          }
        });

      })
    ).subscribe(() => {
    
      this._emails.add({
        ...emailData,
        details: data
      }).then(() => {
        
        this.shared.guardFactory = 2;
        this.router.navigate([ '/orders' ]).then(() => {
          this.shared.updateSource('progress', false);
        })

      });
      
      $.unsubscribe();

    });

  }

  emailExists(email: string) {

    this.shared.updateSource('progress', true);

    from(
      this._emails.ref
      .where('email', '==', email)
      .where('exists', '==', true).get()
    ).pipe(
      map((res) => 
        res.docs.map(e => e.data()).find(e => e.email === email)
      ),
    ).subscribe((res) => {
      
      if (!res) {

        console.log('new customer!');
        
        this.newEmailRegistration = email;
      } else {
  
        console.log('returning customer!');
        console.log(res);

        this.shared.userDataExisting = res.details;

        this.shared.guardFactory = 3;
        this.router.navigate([ '/orders' ]).then(() => {
          this.shared.updateSource('progress', false);
        });
      }

    });
  }

}
