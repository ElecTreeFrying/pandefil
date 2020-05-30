import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationProviderModule } from '../_common/providers/registration-provider.module';

import { RegistrationComponent } from './registration.component';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    RegistrationProviderModule
  ]
})
export class RegistrationModule { }
