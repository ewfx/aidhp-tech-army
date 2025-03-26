import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ContentRecommendationService } from '../content-recommendation.service';

@Component({
  selector: 'app-content-recommendation',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],  // Use ReactiveFormsModule
  templateUrl: './content-recommendation.component.html',
  styleUrls: ['./content-recommendation.component.css']
})
export class ContentRecommendationComponent {
  contentForm: FormGroup;
  recommendations: string = "";
  loading: boolean = false;
  private contentService = inject(ContentRecommendationService);
  private fb = inject(FormBuilder);

  constructor() {
    this.contentForm = this.fb.group({
      Age: [30],
      MaritalStatus: ['Single'],
      Occupation: ['Software Engineer'],
      Interests: ['Sci-Fi, Mystery']
    });
  }

  getRecommendations() {
    this.loading = true;
    this.contentService.getRecommendations(this.contentForm.value).subscribe(
      response => {
        this.recommendations = response.recommendations;
        this.loading = false;
      },
      error => {
        console.error("Error fetching content recommendations:", error);
        this.recommendations = "Error fetching content recommendations.";
        this.loading = false;
      }
    );
  }
}
