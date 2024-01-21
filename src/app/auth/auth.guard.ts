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
  import { jwtDecode } from "jwt-decode";
  
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
         // Get the required role from the route data
    const requiredRole = route.data.role;
      return this.authService.userBackend.pipe(
        take(1),
        map(user => {
          //console.log(user.role);
          
          const isAuth = !!user;
          console.log(isAuth);

          const token = user.token;
const decoded = jwtDecode(token);

console.log(decoded);

          
          if (isAuth) {
            // if (user.role === requiredRole) {
            //   return true;
            // }
            // else{
            //   alert('You do not have permission to access this page.');
            // }
            return true;
           
          }
          return this.router.createUrlTree(['/auth']);
        })
      );
    }
  }





// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
//   UrlTree
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';

// import { AuthService } from './auth.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | boolean
//     | UrlTree
//     | Promise<boolean | UrlTree>
//     | Observable<boolean | UrlTree> {
//     return this.authService.userBackend.pipe(
//       take(1),
//       map(user => {
//         const isAuth = !!user;
//         const requiredRoles = route.data.roles as string[]; // Get required roles from route data
        
//         if (!isAuth) {
//           return this.router.createUrlTree(['/auth']);
//         }

//         if (requiredRoles && requiredRoles.length > 0) {
//           const userRoles = user.roles as string[]; // Get user's roles from the user object

//           // Check if the user has at least one of the required roles
//           const hasRequiredRole = userRoles.some(role => requiredRoles.includes(role));
//           if (!hasRequiredRole) {
//             // Redirect to a designated access denied page or show an access denied message
//             return this.router.createUrlTree(['/access-denied']);
//           }
//         }
//         return true;
//       })
//     );
//   }
// }





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