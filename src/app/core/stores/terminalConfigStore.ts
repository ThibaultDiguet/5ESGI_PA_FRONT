import { Injectable, signal } from '@angular/core';
import { Category } from '../types/restaurant';

@Injectable({
  providedIn: 'root',
})
export class TerminalConfigStore {
  categories = signal<Category[]>([]);
  selectedCategory = signal<Category | null>(null);

  setCategories(categories: Category[]) {
    this.categories.set(categories);
  }

  setSelectedCategory(category: Category) {
    this.selectedCategory.set(category);
  }

  clear() {
    this.categories.set([]);
  }
}
