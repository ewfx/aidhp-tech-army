import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {RecommendationComponent} from './product-recommendation/product-recommendation.component';
import {BankingRecommendationComponent} from './banking-recommendation/banking-recommendation.component';
import {ContentRecommendationComponent} from './content-recommendation/content-recommendation.component';
import {CareerRecommendationComponent} from './career-recommendation/career-recommendation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RecommendationComponent, BankingRecommendationComponent, ContentRecommendationComponent, CareerRecommendationComponent],  // Required imports for SSR support
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product Recommendation System';
}
