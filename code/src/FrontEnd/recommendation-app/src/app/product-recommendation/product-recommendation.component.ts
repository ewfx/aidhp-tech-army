import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';  // ✅ Use ReactiveFormsModule
import { RecommendationService } from '../recommendation.service';

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],  // ✅ Use ReactiveFormsModule
  templateUrl: './product-recommendation.component.html',
  styleUrls: ['./product-recommendation.component.css']
})
export class RecommendationComponent {
  recommendationForm: FormGroup;
  recommendations: string = "";
  loading: boolean = false;
  private recommendationService = inject(RecommendationService);
  private fb = inject(FormBuilder);

  constructor() {
    this.recommendationForm = this.fb.group({
      Age: [25],
      Gender: ['Male'],
      City: [''],
      State: [''],
      Country: ['India'],
      MaritalStatus: ['Single'],
      Education: [''],
      Occupation: [''],
      Income: [50000],
      Interests: [''],
      PurchasedProducts: ['']
    });
  }

  getRecommendations() {
    this.loading = true;
    this.recommendationService.getRecommendations(this.recommendationForm.value).subscribe(
      response => {
        this.recommendations = response.recommendations;
        this.loading = false;
      },
      error => {
        console.error("Error fetching recommendations:", error);
        this.recommendations = "Error fetching recommendations.";
        this.loading = false;
      }
    );
  }
}
