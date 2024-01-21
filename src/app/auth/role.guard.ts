// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { UserService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuard implements CanActivate {
//   constructor(private userService: UserService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     // Get the required role from the route data
//     const requiredRole = route.data.role;

//     // Get the user's role from the UserService
//     const userRole = this.userService.getUserRole();

//     // Check if the user has the required role
//     if (userRole === requiredRole) {
//       return true; // User has access to the route
//     } else {
//       // Redirect to a different page or show an access denied message
//       this.router.navigate(['/access-denied']);
//       return false; // User does not have access to the route
//     }
//   }
// }




// import { RoleGuard } from './role.guard';

// const appRoutes: Routes = [
//   { path: 'city', canActivate: [RoleGuard], data: { role: 'admin' }, component: CityComponent },
//   { path: 'company', canActivate: [RoleGuard], data: { role: 'admin' }, component: CompanyComponent },
//   // ... other routes
// ];
// import { RoleGuard } from './role.guard';

// const appRoutes: Routes = [
//   { path: 'city', canActivate: [RoleGuard], data: { roles: ['admin', 'manager'] }, component: CityComponent },
//   { path: 'company', canActivate: [RoleGuard], data: { roles: ['admin'] }, component: CompanyComponent },
//   // ... other routes
// ];