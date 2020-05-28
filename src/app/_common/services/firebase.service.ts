import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private _orders: AngularFirestoreCollection<any>
  private _users: AngularFirestoreCollection<any>
  private _admin: AngularFirestoreCollection<any>

  constructor(
    private fire: AngularFirestore
  ) { 
    this._orders = fire.collection('orders');
    this._users = fire.collection('users');
    this._admin = fire.collection('admin');
  }

  set order(order: any) {
    this._orders.add(order);
  }

}
