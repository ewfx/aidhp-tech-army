import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private API_URL = 'http://127.0.0.1:8000/recommendProducts';  // Direct API call to FastAPI
  private http = inject(HttpClient);

  getRecommendations(userData: any) {
  return this.http.post<any>(this.API_URL, userData, {
    withCredentials: true, // ✅ Ensure session data is passed correctly
  });
}

}
