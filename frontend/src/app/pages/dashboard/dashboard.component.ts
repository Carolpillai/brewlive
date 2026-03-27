import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, DatePipe, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user: any;
  orders: any[] = [];
  recommendations: any[] = [];
  nextRewardPoints = 100;
  offlineError = false;

  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private menuService = inject(MenuService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      this.loadData();
    }
  }

  loadData(): void {
    if (!this.user) return;
    const userId = this.user.id || this.user._id || 'unknown';

    this.offlineError = false;
    this.orderService.getHistory(userId).subscribe({
      next: (data: any) => {
        this.orders = data || [];
      },
      error: (err: any) => {
        console.error('History failed:', err);
        this.offlineError = true;
      }
    });

    this.menuService.getRecommendations(userId).subscribe({
      next: (data: any) => {
        this.recommendations = data || [];
      },
      error: (err: any) => console.error('Recs failed:', err)
    });
  }

  getPointsProgress(): number {
    if (!this.user) return 0;
    return (this.user.loyaltyPoints % this.nextRewardPoints) / this.nextRewardPoints * 100;
  }

  orderAgain(order: any): void {
    const item = { name: order.drink, price: order.totalPrice ? order.totalPrice / 80 : 380 };
    localStorage.setItem('selectedItem', JSON.stringify(item));
    this.router.navigate(['/order']);
  }

  getEta(order: any): string {
    if (order.status === 'Picked Up') return '';
    if (order.status === 'Ready') return 'Ready for pickup!';
    if (order.status === 'Brewing') return 'Arriving in ~5 mins';
    return 'Arriving in ~15 mins';
  }
}
