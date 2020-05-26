import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '/', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)  },
  { path: 'orders', loadChildren: () => import('./order/order.module').then(m => m.OrderModule)  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
