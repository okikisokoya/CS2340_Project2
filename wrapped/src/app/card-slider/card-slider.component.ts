import { Component } from '@angular/core';
import {CardSliderModule} from './card-slider.module';

@Component({
  selector: 'app-card-slider',
  imports: [
    CardSliderModule
  ],
  templateUrl: './card-slider.component.html',
  styleUrl: './card-slider.component.css'
})
export class CardSliderComponent {
  cards: string[] = ['#00e676', '#e91e63', '#2196f3', '#009688', '#f44336']
}
