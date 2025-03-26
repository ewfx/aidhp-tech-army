import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';  // ✅ Correct import for NgIf and NgFor
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { BankingRecommendationService } from '../banking-recommendation.service';

@Component({
  selector: 'app-banking-recommendation',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],  // Use ReactiveFormsModule
  templateUrl: './banking-recommendation.component.html',
  styleUrls: ['./banking-recommendation.component.css']
})
export class BankingRecommendationComponent {
  bankingForm: FormGroup;
  recommendations: string = "";
  loading: boolean = false;
  private bankingService = inject(BankingRecommendationService);
  private fb = inject(FormBuilder);

  constructor() {
    this.bankingForm = this.fb.group({
      Age: [30],
      MaritalStatus: ['Single'],
      Income: [75000],
      Interests: ['Investments']
    });
  }

  getRecommendations() {
    this.loading = true;
    this.bankingService.getRecommendations(this.bankingForm.value).subscribe(
      response => {
        this.recommendations = response.recommendations;
        this.loading = false;
      },
      error => {
        console.error("Error fetching recommendations:", error);
        this.recommendations = "Error fetching banking recommendations.";
        this.loading = false;
      }
    );
  }
}
