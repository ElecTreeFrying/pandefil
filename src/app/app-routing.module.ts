import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LandingPageGuard,
  RegistrationGuard,
  OrdersGuard
} from './_common/guard/app.guard';


const routes: Routes = [
  { 
    path: 'orders', 
    canActivate: [ OrdersGuard ],
    loadChildren: () => import('./order/order.module')
      .then(m => m.OrderModule)
  },
  { 
    path: 'registration',  
    canActivate: [ RegistrationGuard ],
    loadChildren: () => import('./registration/registration.module')
      .then(m => m.RegistrationModule)  
  },
  { 
    path: '',  
    canActivate: [ LandingPageGuard ],
    loadChildren: () => import('./landing-page/landing-page.module')
      .then(m => m.LandingPageModule)  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
