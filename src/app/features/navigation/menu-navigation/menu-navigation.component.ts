import {Component, signal, ViewChild} from '@angular/core';
import {SearchInputComponent} from '../../../shared/controls/search-input/search-input.component';
import {CategoryTreeComponent} from '../category-tree/category-tree.component';
import {PanelCardComponent} from '../../../shared/ui/panel-card/panel-card.component';

@Component({
  selector: 'app-menu-navigation',
  standalone: true,
  imports: [SearchInputComponent, CategoryTreeComponent, PanelCardComponent],
  templateUrl: './menu-navigation.component.html',
  styleUrl: './menu-navigation.component.css'
})
export class MenuNavigationComponent {
  protected filter = signal('');
  @ViewChild(CategoryTreeComponent) private tree?: CategoryTreeComponent;

  onExpandAll(): void {
    this.tree?.triggerExpandAll();
  }

  onCollapseAll(): void {
    this.tree?.triggerCollapseAll();
  }

  protected onFilterChange(value: string): void {
    this.filter.set(value);
  }

}
