import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SharedService } from '../services/shared.service';


@Injectable({
  providedIn: 'root'
})
export class LandingPageGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private shared: SharedService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // return true;
    if (this.shared.guardFactory === 0 || this.shared.guardFactory === undefined) {
      return true;
    } else {
      this.shared.guardFactory = 0;
      this.router.navigate([ '/' ]);
      return false;
    }
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private shared: SharedService
    ) {}
    
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // return true;
    if (this.shared.guardFactory === 1) {
      return true;
    } else {
      this.shared.guardFactory = 0;
      this.router.navigate([ '/' ]);
      return false;
    }
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class OrdersGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private shared: SharedService
    ) {}
    
    canActivate(
      next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    // return true;
    if (this.shared.guardFactory > 1) {
      return true;
    } else {
      this.shared.guardFactory = 0;
      this.router.navigate([ '/' ]);
      return false;
    }
  }
  
}
