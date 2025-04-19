import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isAdmin = false;
  private authSubscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí deberás implementar la lógica para verificar si el usuario está logueado
    // Ejemplo: this.authService.currentUser$.subscribe(user => {...})
    console.log('Header component initialized');
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    // Aquí implementarás la lógica de logout cuando crees el AuthService
    console.log('Logout clicked');
    // this.authService.logout();
    // this.router.navigate(['/']);
  }
}
