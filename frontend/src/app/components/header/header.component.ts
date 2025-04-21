import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isAdmin = false;
  private authSubscription: Subscription | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to authentication status changes
    this.authSubscription = this.authService.authStatus$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
        this.checkAdminStatus();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private checkAdminStatus(): void {
    if (this.isLoggedIn) {
      const userData = this.authService.getUserSession();
      this.isAdmin = userData?.user?.role === 'admin';
    } else {
      this.isAdmin = false;
    }
  }

  async logout(): Promise<void> {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
