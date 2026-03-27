import { Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Component({
  selector: 'app-custom-icon',
  standalone: true,
  template: ` <div #container class="flex items-center justify-center w-full h-full"></div> `,
  styles: [
    `
      :host {
        display: inline-block;
        vertical-align: middle;
      }

      ::ng-deep svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
    `,
  ],
})
export class CustomIcon {
  path = input.required<string>();
  container = viewChild<ElementRef<HTMLDivElement>>('container');
  private http = inject(HttpClient);

  constructor() {
    effect(() => {
      this.loadSvg(this.path());
    });
  }

  private loadSvg(path: string) {
    this.http
      .get(path, { responseType: 'text' })
      .pipe(take(1))
      .subscribe({
        next: (svgContent) => {
          const el = this.container()?.nativeElement;
          if (el) {
            el.innerHTML = svgContent;
            const svgElement = el.querySelector('svg');
            if (svgElement) {
              svgElement.setAttribute('fill', 'currentColor');
            }
          }
        },
        error: (err) => console.error(`impossible de charger le SVG: ${path}`, err),
      });
  }
}
