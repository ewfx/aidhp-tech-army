import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankingRecommendationService {
  private API_URL = 'http://127.0.0.1:8000/banking-recommend';  // FastAPI banking API endpoint
  private http = inject(HttpClient);

  getRecommendations(userData: any) {
    return this.http.post<any>(this.API_URL, userData);
  }
}
