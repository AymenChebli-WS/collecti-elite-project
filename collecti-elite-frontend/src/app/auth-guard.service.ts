import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is logged in
    const isLoggedIn = this.userService.isLoggedIn();

    if (isLoggedIn) {
      // If the user is logged in, allow navigation to the requested route
      return true;
    } else {
      // If the user is not logged in, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
