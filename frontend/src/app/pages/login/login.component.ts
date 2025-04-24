import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import { LoginInterface } from '../../types';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Redirigir si ya está autenticado
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    const loginData: LoginInterface = {
      email,
      password,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.isLoading = false;

        // Redirigir según el rol del usuario
        if (response.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']); // Usuarios normales van al home
        }

        console.log('✅✅✅ Login exitoso!');
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.message ||
          'Error al iniciar sesión. Comprueba tus credenciales.';
        console.error('Error al iniciar sesión', error);
      },
    });
  }
}
