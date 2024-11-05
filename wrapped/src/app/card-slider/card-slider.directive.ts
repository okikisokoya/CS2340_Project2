import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  AfterViewInit
} from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Directive({
  selector: '[card-slider]'
})
export class CardSliderDirective implements AfterViewInit {
  private count: number = 0;
  private maxDistance: number = 0;
  private distance = -1;
  private elemWidth: number = 310;

  @Input() keyboardActive: boolean = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.count = this.el.nativeElement.children.length;
    this.maxDistance = this.getMaxDistance(this.el.nativeElement.children.length, this.elemWidth);
  }

  @HostListener('panmove', ['$event'])
  onPanMove(e: any) {
    this.el.nativeElement.classList.remove('animate');
    let distance = this.distance + e.deltaX;
    if (distance >= 0) {
      distance = 0;
      this.distance = 0;
    }
    this.el.nativeElement.style.transform = `translate3d(${distance}px,0,0)`;
  }

  @HostListener('panend', ['$event'])
  onPanEnd(e: any) {
    this.el.nativeElement.classList.add('animate');
    this.distance = this.getNearestMultiple(this.distance + e.deltaX, this.elemWidth);
    this.el.nativeElement.style.transform = `translate3d(${this.distance}px,0,0)`;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.keyboardActive) {
      this.el.nativeElement.classList.remove('animate');
      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        this.next();
      }
      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        this.previous();
      }
    }
  }

  private next() {
    this.el.nativeElement.classList.add('animate');
    this.distance = this.getNearestMultiple(this.distance - (this.elemWidth / 2 + 1), this.elemWidth);
    this.el.nativeElement.style.transform = `translate3d(${this.distance}px,0,0)`;
  }

  private previous() {
    this.el.nativeElement.classList.add('animate');
    this.distance = this.getNearestMultiple(this.distance + (this.elemWidth / 2 + 1), this.elemWidth);
    this.el.nativeElement.style.transform = `translate3d(${this.distance}px,0,0)`;
  }

  private getNearestMultiple(value: number, multiple: number) {
    let nearest = multiple * Math.round(value / multiple);
    if (nearest >= 0) {
      nearest = 0;
    }
    if (nearest < this.maxDistance) {
      nearest = this.maxDistance;
    }
    return nearest;
  }

  private getMaxDistance(count: number, width: number) {
    return ((count * width) * -1) + width;
  }
}
