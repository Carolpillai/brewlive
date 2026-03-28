import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BrewLive';
  user: any;

  public authService = inject(AuthService);
  mobileMenuOpened = false;

  constructor() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpened = !this.mobileMenuOpened;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpened = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
