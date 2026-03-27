import {computed, Injectable, signal} from '@angular/core';
import {Category, Item} from '../types/restaurant';

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

    if (!selectedName) return [];

    const filtered = allItems.filter((item) => item.categories?.includes(selectedName));

    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  });

  clear() {
    this.categories.set([]);
    this.selectedCategory.set(null);
    this.items.set([]);
  }
}
