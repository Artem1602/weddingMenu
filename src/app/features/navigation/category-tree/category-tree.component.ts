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
  private readonly menuApi = inject(MenuApiService);
  private readonly filterTerm = signal('');

  protected readonly loading = this.menuApi.loading;
  protected readonly error = this.menuApi.error;
  protected readonly filteredGroups = computed(() => this.applyFilter(this.menuApi.groups(), this.filterTerm()));

  private readonly collapsed = signal(new Set<string>());
  private readonly collapseSignals = new Map<string, Signal<boolean>>();

  public readonly expandAllTrigger = signal(0);
  public readonly collapseAllTrigger = signal(0);

  constructor() {
    effect(() => {
      this.expandAllTrigger();
      this.expandAll();
    });

    effect(() => {
      this.collapseAllTrigger();
      this.collapseAll();
    });
  }

  protected isCollapsed(groupName: string): Signal<boolean> {
    let signalForGroup = this.collapseSignals.get(groupName);
    if (!signalForGroup) {
      signalForGroup = computed(() => this.collapsed().has(groupName));
      this.collapseSignals.set(groupName, signalForGroup);
    }
    return signalForGroup;
  }

  protected collapseAll(): void {
    this.collapsed.set(new Set(this.menuApi.groups().map(group => group.name)));
  }

  protected expandAll(): void {
    this.collapsed.set(new Set());
  }

  protected toggleGroup(group: MenuGroup): void {
    this.collapsed.update((prev) => {
      const next = new Set(prev);
      if (next.has(group.name)) {
        next.delete(group.name);
      } else {
        next.add(group.name);
      }
      return next;
    });
  }

  public triggerExpandAll(): void {
    this.expandAllTrigger.update((value) => value + 1);
  }

  public triggerCollapseAll(): void {
    this.collapseAllTrigger.update((value) => value + 1);
  }

  @Input()
  set filter(value: string) {
    this.filterTerm.set((value ?? '').trim().toLowerCase());
  }

  async ngOnInit(): Promise<void> {
    await this.menuApi.load('/wedding_menu_full.json', false);
    effect(() => {
      this.expandAllTrigger();
      this.expandAll();
    });
    effect(() => {
      this.collapseAllTrigger();
      this.collapseAll();
    });
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
