import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../Services/User.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
    constructor(private authService: UserService, private router: Router) { }

    canActivate() {
        if (false) {
            this.router.navigate(['/profile']);
            return false;
        } else {
            return true;
        }
    }
}
