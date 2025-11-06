import {Component, inject, signal, ViewChild} from '@angular/core';
import {SearchInputComponent} from '../../../shared/controls/search-input/search-input.component';
import {CategoryTreeComponent} from '../category-tree/category-tree.component';
import {PanelCardComponent} from '../../../shared/ui/panel-card/panel-card.component';
import {MenuApiService} from '../../../core/services/menu-api.service';

@Component({
  selector: 'app-menu-navigation',
  standalone: true,
  imports: [SearchInputComponent, CategoryTreeComponent, PanelCardComponent],
  templateUrl: './menu-navigation.component.html',
  styleUrl: './menu-navigation.component.css'
})
export class MenuNavigationComponent {
  protected filter = signal('');
  public readonly menuApi = inject(MenuApiService);

  onExpandAll(): void {
    this.menuApi.expandAll();
  }

  onCollapseAll(): void {
    this.menuApi.collapseAll();
  }

  protected onFilterChange(value: string): void {
    this.filter.set(value);
  }

}
