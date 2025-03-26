import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerRecommendationService {
  private apiUrl = 'http://127.0.0.1:8000/career-recommend';  // ✅ FastAPI URL

  constructor(private http: HttpClient) {}

  getCareerRecommendations(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
