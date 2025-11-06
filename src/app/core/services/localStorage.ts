import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private subjects = new Map<string, BehaviorSubject<unknown>>();

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key) {
        this.emitChange(event.key, event.newValue);
      } else {
        this.subjects.forEach(subject => subject.next(null));
      }
    });
  }

  getItem<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    return raw ? this.safeParse<T>(raw) : null;
  }

  watchItem<T>(key: string): Observable<T | null> {
    if (!this.subjects.has(key)) {
      const current = this.getItem<T>(key);
      this.subjects.set(key, new BehaviorSubject<unknown>(current));
    }
    return this.subjects.get(key)!.asObservable() as Observable<T | null>;
  }

  setItem<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      this.emitChange(key, serialized);
    } catch (err) {
      console.warn(`LocalStorageService.setItem(${key}) failed:`, err);
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
      this.emitChange(key, null);
    } catch (err) {
      console.warn(`LocalStorageService.removeItem(${key}) failed:`, err);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
      this.subjects.forEach(subject => subject.next(null));
    } catch (err) {
      console.warn('LocalStorageService.clear() failed:', err);
    }
  }

  unwatchItem(key: string): void {
    const subject = this.subjects.get(key);
    if (subject) {
      subject.complete();
      this.subjects.delete(key);
    }
  }

  private emitChange<T>(key: string, newValue?: string | null): void {
    const subject = this.subjects.get(key);
    if (subject) {
      const parsed = newValue ? this.safeParse<T>(newValue) : null;
      (subject as BehaviorSubject<T | null>).next(parsed);
    }
  }

  private safeParse<T>(raw: string): T | null {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }
}
