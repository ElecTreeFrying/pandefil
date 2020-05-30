import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class VariableService {

  constructor() { }

  private _userData: any;
  get userData() { return this._userData; }
  set userDataExisting(userData: any) { this._userData = userData; }
  set userDataNew(userData: any) { 

    const data: any = {};

    data.fn = userData.fn;
    data.ln = userData.ln;
    data.address = userData.address;
    data.instagram = userData.instagram;
    data.facebook = userData.facebook;
    data.email = userData.email;
    data.phone = userData.phone;

    this._userData = data; 
  }
  
  private _emailData: string;
  get emailData() { return this._emailData; }
  set emailData(emailData: any) { this._emailData = emailData; }

  private _email: string;
  get email() { return this._email; }
  set email(email: any) { this._email = email; }

  private _guardFactory: number;
  get guardFactory() { return this._guardFactory; }
  set guardFactory(guardFactory: any) { this._guardFactory = guardFactory; }

}
