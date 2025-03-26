import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentRecommendationService {
  private API_URL = 'http://127.0.0.1:8000/content-recommend';  // FastAPI endpoint for content recommendations
  private http = inject(HttpClient);

  getRecommendations(userData: any) {
    return this.http.post<any>(this.API_URL, userData);
  }
}
