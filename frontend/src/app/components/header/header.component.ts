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

  async ngOnInit(): Promise<void> {
    // Verificamos el estado de autenticación al iniciar
    await this.checkAuthStatus();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private async checkAuthStatus(): Promise<void> {
    this.isLoggedIn = await this.authService.isLoggedIn();
    // Aquí podrías verificar también si el usuario es admin
    // basado en la info guardada en localStorage
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/']);
  }
}
