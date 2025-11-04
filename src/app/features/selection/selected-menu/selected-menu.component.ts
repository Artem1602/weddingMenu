import { Component, computed, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MenuStateService } from '../../../core/services/menu-state.service';
import { SelectedItemRowComponent } from '../selected-item-row/selected-item-row.component';
import { PanelCardComponent } from '../../../shared/ui/panel-card/panel-card.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-selected-menu',
  standalone: true,
  imports: [NgIf, NgForOf, PanelCardComponent, SelectedItemRowComponent, EmptyStateComponent],
  templateUrl: './selected-menu.component.html',
  styleUrl: './selected-menu.component.css'
})
export class SelectedMenuComponent {
  private readonly menuState = inject(MenuStateService);
  protected readonly groupedItems = this.menuState.groupedItems;
  protected readonly totalQuantity = this.menuState.totalQuantity;
  protected readonly hasItems = computed(() => this.groupedItems().length > 0);

  protected clear(): void {
    this.menuState.clear();
  }
}
