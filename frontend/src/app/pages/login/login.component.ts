import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  isLogin = true;
  loading = false;
  error = '';
  connectionStatus = '';

  // Separate objects for Login and Registration to avoid binding conflicts
  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'register') {
        this.isLogin = false;
      }
    });
  }

  toggleAuth(): void {
    this.isLogin = !this.isLogin;
    this.error = '';
    this.loading = false;
  }

  testConnection(): void {
    this.connectionStatus = 'Testing...';
    this.authService.testBackend().subscribe({
      next: (res: any) => this.connectionStatus = 'Backend Reachable! ✅',
      error: (err: any) => {
        console.error('Connection test failed:', err);
        this.connectionStatus = 'Backend Unreachable ❌ Check port 5050';
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    if (!this.isLogin) {
      if (this.registerData.password !== this.registerData.confirmPassword) {
        this.error = 'Passwords do not match';
        this.loading = false;
        return;
      }

      this.authService.register({
        name: this.registerData.name,
        email: this.registerData.email,
        password: this.registerData.password
      }).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err: any) => {
          this.error = err?.error?.message || 'Registration failed';
          this.loading = false;
        }
      });
    } else {
      this.authService.login({
        email: this.loginData.email,
        password: this.loginData.password
      }).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err: any) => {
          this.error = err?.error?.message || 'Login failed';
          this.loading = false;
        }
      });
    }
  }
}
