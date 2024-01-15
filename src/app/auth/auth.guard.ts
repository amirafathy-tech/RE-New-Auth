import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { map, tap, take } from 'rxjs/operators';
  
  import { AuthService } from './auth.service';
  
  @Injectable({ providedIn: 'root' })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      router: RouterStateSnapshot
    ):
      | boolean
      | UrlTree
      | Promise<boolean | UrlTree>
      | Observable<boolean | UrlTree> {
      return this.authService.userBackend.pipe(
        take(1),
        map(user => {
          const isAuth = !!user;
          console.log(isAuth);
          
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        })
      );
    }
  }


//   import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map, tap, take } from 'rxjs/operators';

// import { AuthService } from './auth.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     router: RouterStateSnapshot
//   ):
//     | boolean
//     | UrlTree
//     | Promise<boolean | UrlTree>
//     | Observable<boolean | UrlTree> {
//     return this.checkAuthentication().pipe(
//       map(isAuthenticated => {
//         if (isAuthenticated) {
//           return this.checkRole();
//         } else {
//           return this.router.createUrlTree(['/auth']);
//         }
//       })
//     );
//   }

//   private checkAuthentication(): Observable<boolean> {
//     return this.authService.user.pipe(
//       take(1),
//       map(user => !!user)
//     );
//   }

//   private checkRole(): boolean | UrlTree {
//     const user = this.authService.getCurrentUser(); // Assuming this method retrieves the current user from the authService
//     const isAdmin = user.role === 'admin'; // Assuming role property exists in the user object

//     if (isAdmin) {
//       return true;
//     } else {
//       // Redirect to unauthorized page or show a popup message
//       // Uncomment the appropriate section based on your preference.

//       // Redirect to unauthorized page
//       // return this.router.createUrlTree(['/unauthorized']);

//       // Show a popup message
//       alert('You do not have permission to access this page.');
//       return this.router.createUrlTree(['/auth']);
//     }
//   }
// }