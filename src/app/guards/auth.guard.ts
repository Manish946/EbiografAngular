import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { UserService } from '../Services/User.service';
import { Observable } from 'rxjs';
@Injectable()

export class AuthGuard implements CanActivate{
  constructor(private auth:UserService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if (this.auth.isAuthenticated()) { // This is the injected auth service which depends on what you are using
           return true;
          }
      console.log('access denied!')
      this.router.navigate(['/login']);
      return false;
  }

}
