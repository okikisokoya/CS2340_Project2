import { NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { CardSliderDirective } from './card-slider.directive';
import { CardSliderComponent } from './card-slider.component';

declare const Hammer: any; // Temporarily declare Hammer to avoid import conflicts

// Custom Hammer configuration class with platform check
export class MyHammerConfig extends HammerGestureConfig {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    super();
    if (isPlatformBrowser(this.platformId)) {
      // Load hammerjs only on the client side
      const Hammer = require('hammerjs');
      this.overrides = {
        // Override hammerjs default configuration
        'pan': { direction: Hammer.DIRECTION_HORIZONTAL }
      };
    }
  }
}

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [CardSliderDirective, CardSliderComponent],
  bootstrap: [CardSliderComponent],
  exports: [CardSliderDirective],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ]
})
export class CardSliderModule { }
