import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common'; // Only pipe
import { Router, RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, DecimalPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  groupedMenu: { category: string, items: any[] }[] = [];
  recommendations: any[] = [];
  user: any;
  loading = true;
  error = '';

  private menuService = inject(MenuService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {
    try {
      this.user = this.authService.getUser();
    } catch (e) {
      console.warn('Could not load user in Menu', e);
      this.user = null;
    }
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = '';

    this.menuService.getMenu().pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (data: any) => {
        try {
          this.menuItems = data || [];
          this.groupItems(this.menuItems);
        } catch (e) {
          console.error('Error grouping items', e);
        }
      },
      error: (err: any) => {
        console.error('Menu load failed:', err);
        this.error = 'Unable to load menu. Please check your connection.';
      }
    });

    if (this.user && this.user.id) {
      this.menuService.getRecommendations(this.user.id).subscribe({
        next: (data: any) => {
          this.recommendations = data || [];
          this.cdr.detectChanges();
        },
        error: (err: any) => console.error('Recs failed:', err)
      });
    }
  }

  groupItems(items: any[]): void {
    if (!items || !Array.isArray(items)) return;
    const groups: { [key: string]: any[] } = {};
    items.forEach(item => {
      const cat = item.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    this.groupedMenu = Object.keys(groups).map(key => ({
      category: key,
      items: groups[key]
    }));
  }

  orderNow(item: any): void {
    localStorage.setItem('selectedItem', JSON.stringify(item));
    this.router.navigate(['/order']);
  }
}
