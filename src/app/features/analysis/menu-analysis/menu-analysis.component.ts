import { Component, computed, inject } from '@angular/core';
import { MenuStateService } from '../../../core/services/menu-state.service';
import { AnalysisTablesComponent } from '../analysis-tables/analysis-tables.component';
import { PanelCardComponent } from '../../../shared/ui/panel-card/panel-card.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-menu-analysis',
  standalone: true,
  imports: [PanelCardComponent, EmptyStateComponent, AnalysisTablesComponent],
  templateUrl: './menu-analysis.component.html',
  styleUrl: './menu-analysis.component.css'
})
export class MenuAnalysisComponent {
  private readonly menuState = inject(MenuStateService);
  protected readonly groupedItems = this.menuState.groupedItems;
  protected readonly totalQuantity = this.menuState.totalQuantity;
  protected readonly totalGroups = this.menuState.totalGroups;
  protected readonly hasSelection = computed(() => this.groupedItems().length > 0);
  menuStateService = inject(MenuStateService);

  protected onSaveAsJson() {
    this.menuStateService.saveAsJson();
  }
}
