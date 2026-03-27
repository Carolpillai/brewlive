import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:5050/api/menu';

  constructor(private http: HttpClient) {}

  getMenu() {
    console.log('[FRONTEND] Requesting menu from:', this.apiUrl);
    return this.http.get(`${this.apiUrl}`).pipe(
      timeout(7000)
    );
  }

  getRecommendations(userId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(`${this.apiUrl}/recommendations/${userId}`, { headers }).pipe(
      timeout(7000)
    );
  }
}
