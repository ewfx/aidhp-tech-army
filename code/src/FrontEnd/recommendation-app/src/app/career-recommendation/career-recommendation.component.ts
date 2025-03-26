import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CareerRecommendationService } from '../career-recommendation.service';

@Component({
  selector: 'app-career-recommendation',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],  // ✅ Use ReactiveFormsModule
  templateUrl: './career-recommendation.component.html',
  styleUrls: ['./career-recommendation.component.css']
})
export class CareerRecommendationComponent {
  careerForm: FormGroup;
  recommendations: string = "";
  loading: boolean = false;
  private careerService = inject(CareerRecommendationService);
  private fb = inject(FormBuilder);

  constructor() {
    this.careerForm = this.fb.group({
      Age: [30, [Validators.required, Validators.min(18)]],
      Occupation: ['Software Engineer', Validators.required],
      Income: ['80000', Validators.required],
      Interests: ['AI, Data Science', Validators.required]
    });
  }

  getRecommendations() {
    this.loading = true;
    this.careerService.getCareerRecommendations(this.careerForm.value).subscribe(
      response => {
        this.recommendations = response.recommendations;
        this.loading = false;
      },
      error => {
        console.error("❌ Error fetching career recommendations:", error);
        this.recommendations = "Error fetching career recommendations.";
        this.loading = false;
      }
    );
  }
}
