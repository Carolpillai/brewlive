import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common'; // Specific pipes
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, RouterModule, DecimalPipe, TitleCasePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  selectedItem: any;
  customization = {
    size: 'medium',
    milk: 'whole',
    sugar: 'medium',
    extraShot: false,
    whippedCream: false,
    specialInstructions: ''
  };
  totalPrice = 0;
  loading = false;
  error = '';

  private orderService = inject(OrderService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    const itemData = localStorage.getItem('selectedItem');
    if (!itemData) {
      this.router.navigate(['/menu']);
      return;
    }
    this.selectedItem = JSON.parse(itemData);
    this.calculatePrice();
  }

  calculatePrice(): void {
    if (!this.selectedItem) return;
    
    let price = this.selectedItem.price;
    if (this.customization.size === 'small') price -= 40;
    if (this.customization.size === 'large') price += 80;
    if (this.customization.extraShot) price += 40;
    if (this.customization.whippedCream) price += 60;
    this.totalPrice = price;
  }

  placeOrder(): void {
    if (!this.selectedItem || this.loading) return;
    this.loading = true;
    this.error = '';

    const order = {
      drink: this.selectedItem.name,
      customization: this.customization,
      totalPrice: this.totalPrice
    };

    this.orderService.placeOrder(order).subscribe({
      next: (res: any) => {
        this.router.navigate(['/tracker', res._id]);
      },
      error: (err: any) => {
        console.error('Order failed:', err);
        this.error = err?.error?.message || 'Failed to place order. Please try again.';
        this.loading = false;
      }
    });
  }
}
