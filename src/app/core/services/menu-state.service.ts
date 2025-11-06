import {Injectable, computed, signal} from '@angular/core';
import {MenuItem} from '../../model/menu.models';
import {parsePrice, parseWeight} from './functions.util';

export interface SelectedMenuItem extends MenuItem {
  groupName: string;
  quantity: number;
}

export interface SelectedGroup {
  groupName: string;
  items: SelectedMenuItem[];
}

@Injectable({providedIn: 'root'})
export class MenuStateService {
  private readonly _items = signal<SelectedMenuItem[]>([]);
  readonly items = this._items.asReadonly();
  readonly totalQuantity = computed(() =>
    this._items().reduce((total, item) => total + item.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this._items().reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0)
  );
  readonly totalWeight = computed(() =>
    this._items().reduce((total, item) => total + parseWeight(item.weight) * item.quantity, 0)
  );
  readonly totalGroups = computed(() => new Set(this._items().map((item) => item.groupName)).size);
  readonly groupedItems = computed<SelectedGroup[]>(() => {
    const groups = new Map<string, SelectedMenuItem[]>();
    for (const item of this._items()) {
      const list = groups.get(item.groupName) ?? [];
      list.push(item);
      groups.set(item.groupName, list);
    }
    return Array.from(groups.entries())
      .map(([groupName, items]) => ({
        groupName,
        items: [...items].sort((a, b) => a.name.localeCompare(b.name))
      }))
      .sort((a, b) => a.groupName.localeCompare(b.groupName));
  });

  quantityFor(groupName: string, itemName: string): number {
    const key = this.composeKey(groupName, itemName);
    return this._items().find((item) => this.composeKey(item.groupName, item.name) === key)?.quantity ?? 0;
  }

  addOrIncrement(groupName: string, item: MenuItem, step = 1): void {
    const next = [...this._items()];
    const key = this.composeKey(groupName, item.name);
    const index = next.findIndex((i) => this.composeKey(i.groupName, i.name) === key);
    if (index === -1) {
      next.push({...item, groupName, quantity: Math.max(step, 1)});
    } else {
      next[index] = {...next[index], quantity: next[index].quantity + step};
    }
    this._items.set(this.normalize(next));
  }

  decrement(groupName: string, itemName: string, step = 1): void {
    const key = this.composeKey(groupName, itemName);
    const next = this._items()
      .map((item) =>
        this.composeKey(item.groupName, item.name) === key
          ? {...item, quantity: item.quantity - step}
          : item
      )
      .filter((item) => item.quantity > 0);
    this._items.set(this.normalize(next));
  }

  setQuantity(groupName: string, item: MenuItem, quantity: number): void {
    if (quantity <= 0) {
      this.remove(groupName, item.name);
      return;
    }
    const next = [...this._items()];
    const key = this.composeKey(groupName, item.name);
    const index = next.findIndex((i) => this.composeKey(i.groupName, i.name) === key);
    if (index === -1) {
      next.push({...item, groupName, quantity});
    } else {
      next[index] = {...next[index], quantity};
    }
    this._items.set(this.normalize(next));
  }

  remove(groupName: string, itemName: string): void {
    const key = this.composeKey(groupName, itemName);
    this._items.set(this._items().filter((item) => this.composeKey(item.groupName, item.name) !== key));
  }

  clear(): void {
    this._items.set([]);
  }

  private normalize(items: SelectedMenuItem[]): SelectedMenuItem[] {
    return items.sort((a, b) => {
      const byGroup = a.groupName.localeCompare(b.groupName);
      return byGroup !== 0 ? byGroup : a.name.localeCompare(b.name);
    });
  }

  private composeKey(groupName: string, itemName: string): string {
    return `${groupName}::${itemName}`.toLowerCase();
  }
}
