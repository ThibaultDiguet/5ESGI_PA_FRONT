import {inject, Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  private ngZone = inject(NgZone);

  // Observable pour s'abonner au succès d'un scan
  private scanSubject = new Subject<string>();
  scanResult$ = this.scanSubject.asObservable();

  private buffer = '';
  private lastKeyTime = Date.now();
  private readonly SCAN_THRESHOLD = 50;

  constructor() {
    this.initEventListener();
  }

  private initEventListener() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      this.handleKeyPress(event);
    });
  }

  private handleKeyPress(event: KeyboardEvent) {
    const currentTime = Date.now();
    const timeDiff = currentTime - this.lastKeyTime;
    this.lastKeyTime = currentTime;

    // 1. Si on reçoit "Enter", on valide le buffer
    if (event.key === 'Enter') {
      if (this.buffer.length > 2) {
        // Exécuter dans NgZone pour s'assurer que l'UI d'Angular se mette à jour
        this.ngZone.run(() => {
          this.scanSubject.next(this.buffer);
          this.buffer = '';
        });
      }
      return;
    }

    // 2. Si le délai est trop long, on considère que c'est un humain qui tape
    if (this.buffer.length > 0 && timeDiff > this.SCAN_THRESHOLD) {
      this.buffer = '';
    }

    // 3. On ajoute le caractère au buffer (on ignore les touches comme Shift, Ctrl...)
    if (event.key.length === 1) {
      this.buffer += event.key;
    }
  }
}
