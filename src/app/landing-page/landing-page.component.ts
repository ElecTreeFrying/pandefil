import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

import { FirebaseService } from '../_common/services/firebase.service';
import { SharedService } from '../_common/services/shared.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  @ViewChild('emailInput') _email: NgModel;

  email: string;
  isKeydown: boolean;

  constructor(
    private fire: FirebaseService,
    public shared: SharedService
  ) { }

  ngOnInit(): void {

    this.email = '';
    // this.email = 'youremail@gmail.com';
    this.isKeydown = false;
  }
  
  submit() {

    if (this.isKeydown || this._email.invalid) return;

    this.isKeydown = true;

    this.fire.emailExists(this.email);

  }

}
