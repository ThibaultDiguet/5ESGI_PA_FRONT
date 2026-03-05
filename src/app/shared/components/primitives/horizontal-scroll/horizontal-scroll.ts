import { Component, ElementRef, input, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-horizontal-slider',
  standalone: true,
  template: `
    <div
      #sliderContainer
      [class]="
        'overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing snap-x snap-mandatory ' +
        customClass()
      "
      [class.snap-none]="isDragging()"
      (mousedown)="startDragging($event)"
      (touchstart)="startDragging($event)"
      (mousemove)="onMove($event)"
      (touchmove)="onMove($event)"
      (mouseup)="stopDragging()"
      (mouseleave)="stopDragging()"
      (touchend)="stopDragging()"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .snap-none {
        scroll-snap-type: none !important;
        scroll-behavior: auto !important;
      }
    `,
  ],
})
export class HorizontalScroll {
  sliderRef = viewChild<ElementRef<HTMLDivElement>>('sliderContainer');
  customClass = input<string>('');
  isDragging = signal(false);
  private startX = 0;
  private scrollLeft = 0;

  startDragging(e: MouseEvent | TouchEvent) {
    this.isDragging.set(true);
    const el = this.sliderRef()?.nativeElement;
    if (!el) return;

    // Gestion hybride Souris / Toucher
    const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;

    this.startX = pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }

  stopDragging() {
    this.isDragging.set(false);
  }

  onMove(e: MouseEvent | TouchEvent) {
    if (!this.isDragging()) return;

    const el = this.sliderRef()?.nativeElement;
    if (!el) return;

    // Empêche le scroll vertical du navigateur pendant qu'on drag horizontalement
    if (e instanceof TouchEvent) {
      e.preventDefault();
    }

    const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    const x = pageX - el.offsetLeft;

    const walk = (x - this.startX) * 1.5;
    el.scrollLeft = this.scrollLeft - walk;
  }
}
