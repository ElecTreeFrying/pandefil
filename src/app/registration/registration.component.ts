import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FirebaseService } from '../_common/services/firebase.service';
import { SharedService } from '../_common/services/shared.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  steps: boolean[];
  
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private fire: FirebaseService,
    public shared: SharedService
  ) { 
    this.form = fb.group({
      personal_information: fb.group({
        fn: [ '', [  ] ],
        ln: [ '', [  ] ],
        address: [ '', [  ] ]
      }),
      social_media: fb.group({
        instagram: [ '', [  ] ],
        facebook: [ '', [  ] ]
      }),
      contact_details: fb.group({
        email: [ this.shared.email, [  ] ],
        password: [ '', [  ] ],
        phone: [ '', [  ] ]
      })
    })
  }

  get forms() {
    return {
      personalInformation: this.form.get('personal_information'),
      socialMedia: this.form.get('social_media'),
      contactDetails: this.form.get('contact_details')
    }
  }

  ngOnInit(): void {

    this.initializeVariables();  
  }

  initializeVariables() {
    
    this.steps = [ false, false, false, false, false ];

    this.steps.forEach((step: any, i: number) => {
      setTimeout(() => { this.steps[i] = true; }, 200 * (i+1));
    });

    this.forms.contactDetails.get('password').disable();
  }

  personalInformation() {

  }

  exit() {
    this.shared.guardFactory = 0;
    this.router.navigate([ '/' ]);
  }

  submit() {

    if (this.form.invalid) return;

    this.shared.userDataNew = {
      ...this.form.value.personal_information,
      ...this.form.value.social_media,
      ...this.form.value.contact_details
    };

    this.shared.guardFactory = 2;
    this.fire.newCustomerRegistration();

  }

}
