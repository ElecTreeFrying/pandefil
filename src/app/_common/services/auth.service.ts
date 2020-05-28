import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';
import { capitalize } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _state: any;

  constructor(
    private auth: AngularFireAuth
  ) { 
    auth.authState.subscribe((res) => {
      console.log(res);
    });
  }

  get state() { return this._state; }

  set signInWithSocial(media: string) {
    const provider = firebase.auth[`${capitalize(media)}AuthProvider`];
    this.auth.signInWithPopup(provider);
  }

  set signInWithEmail(user: any) {
    this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signInAnonymously() {
    this.auth.signInAnonymously();
  }

  signOut() {
    this.auth.signOut();
  }

}
