import { Component, signal } from '@angular/core';
import { SearchInputComponent } from '../../../shared/controls/search-input/search-input.component';
import { CategoryTreeComponent } from '../category-tree/category-tree.component';

@Component({
  selector: 'app-menu-navigation',
  standalone: true,
  imports: [SearchInputComponent, CategoryTreeComponent],
  templateUrl: './menu-navigation.component.html',
  styleUrl: './menu-navigation.component.css'
})
export class MenuNavigationComponent {
  protected filter = signal('');

  protected onFilterChange(value: string): void {
    this.filter.set(value);
  }
}

