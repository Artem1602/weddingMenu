import { Component, ElementRef, ViewChild, computed, inject } from '@angular/core';
import { MenuStateService } from '../../../core/services/menu-state.service';
import { SelectedItemRowComponent } from '../selected-item-row/selected-item-row.component';
import { PanelCardComponent } from '../../../shared/ui/panel-card/panel-card.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state/empty-state.component';
import {MenuAnalysisComponent} from '../../analysis/menu-analysis/menu-analysis.component';

@Component({
  selector: 'app-selected-menu',
  standalone: true,
  imports: [PanelCardComponent, SelectedItemRowComponent, EmptyStateComponent, MenuAnalysisComponent],
  templateUrl: './selected-menu.component.html',
  styleUrl: './selected-menu.component.css'
})
export class SelectedMenuComponent {
  private readonly menuState = inject(MenuStateService);
  protected readonly groupedItems = this.menuState.groupedItems;
  protected readonly totalQuantity = this.menuState.totalQuantity;
  protected readonly hasItems = computed(() => this.groupedItems().length > 0);
  @ViewChild('importInput') private importInput?: ElementRef<HTMLInputElement>;

  protected clear(): void {
    this.menuState.clear();
  }

  protected importFromJSON(): void {
    this.importInput?.nativeElement.click();
  }

  protected async onImportFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    await this.menuState.loadFromJson(file);
    input.value = '';
  }
}
