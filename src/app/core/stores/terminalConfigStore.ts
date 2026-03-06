import { computed, Injectable, signal } from '@angular/core';
import { Category, Item } from '../types/restaurant';

@Injectable({
  providedIn: 'root',
})
export class TerminalConfigStore {
  categories = signal<Category[]>([]);
  selectedCategory = signal<Category | null>(null);
  items = signal<Item[]>([]);

  filteredItems = computed(() => {
    const selectedName = this.selectedCategory()?.name;
    const allItems = this.items();

    console.log(this.selectedCategory()?.name);

    if (!selectedName) return [];

    return allItems.filter((item) => item.categories?.includes(selectedName));
  });

  clear() {
    this.categories.set([]);
    this.selectedCategory.set(null);
    this.items.set([]);
  }
}
