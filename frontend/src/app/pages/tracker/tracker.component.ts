import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent implements OnInit {
  orderId: string = '';
  pointsEarned: number = 0;

  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  constructor() {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    if (this.orderId) {
      this.checkStatus();
    }
  }

  checkStatus(): void {
    this.orderService.getStatus(this.orderId).subscribe({
      next: (data: any) => {
        this.pointsEarned = data.pointsEarned || 0;
      },
      error: (err: any) => console.error('Status failed', err)
    });
  }
}
