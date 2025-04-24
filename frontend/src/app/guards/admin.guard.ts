import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/user/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // First check if the user is logged in
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Then check if the user is an admin
  if (authService.isAdmin()) {
    return true;
  }

  // If the user is logged in but not an admin, redirect to home page
  router.navigate(['/']);
  return false;
};
