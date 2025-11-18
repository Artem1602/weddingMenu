import {Component, Input, OnInit, Signal, computed, effect, inject, signal} from '@angular/core';
import {CategoryNodeComponent} from './category-node/category-node.component';
import {MenuApiService} from '../../../core/services/menu-api.service';
import {MenuGroup} from '../../../model/menu.models';

@Component({
  selector: 'app-category-tree',
  standalone: true,
  imports: [CategoryNodeComponent],
  templateUrl: './category-tree.component.html',
  styleUrl: './category-tree.component.css'
})
export class CategoryTreeComponent implements OnInit {
  public readonly menuApi = inject(MenuApiService);
  private readonly filterTerm = signal('');

  protected readonly loading = this.menuApi.loading;
  protected readonly error = this.menuApi.error;
  protected readonly filteredGroups = computed(() => this.applyFilter(this.menuApi.groups(), this.filterTerm()));

  constructor() {
  }

  @Input()
  set filter(value: string) {
    this.filterTerm.set((value ?? '').trim().toLowerCase());
  }

  async ngOnInit(): Promise<void> {
    await this.menuApi.load('wedding_menu/wedding_menu_full.json', false);
    this.menuApi.collapseAll();
  }

  trackGroup(_: number, group: MenuGroup): string {
    return group.name;
  }

  private applyFilter(groups: MenuGroup[], filter: string): MenuGroup[] {
    if (!filter) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => `${group.name} ${item.name}`.toLowerCase().includes(filter))
      }))
      .filter((group) => group.items.length);
  }
}
