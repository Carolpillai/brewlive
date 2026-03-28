import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  placeOrder(order: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.post(`${this.apiUrl}`, order, { headers }).pipe(
      timeout(7000)
    );
  }

  getHistory(userId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/history/${userId}`, { headers }).pipe(
      timeout(7000)
    );
  }

  getStatus(orderId: string) {
    return this.http.get<{status: string, pointsEarned: number}>(`${this.apiUrl}/status/${orderId}`).pipe(
      timeout(7000)
    );
  }
}
