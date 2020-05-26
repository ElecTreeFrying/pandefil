import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageProviderModule } from '../_common/providers/landing-page-provider.module';

import { LandingPageComponent } from './landing-page.component';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    LandingPageProviderModule
  ]
})
export class LandingPageModule { }
