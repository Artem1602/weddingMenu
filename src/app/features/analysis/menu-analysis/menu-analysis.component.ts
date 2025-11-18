import { Component, ElementRef, ViewChild, computed, inject } from '@angular/core';
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
  @ViewChild('analysisContent', { static: true }) private readonly analysisContentRef!: ElementRef<HTMLElement>;
  private readonly menuState = inject(MenuStateService);
  protected readonly groupedItems = this.menuState.groupedItems;
  protected readonly totalQuantity = this.menuState.totalQuantity;
  protected readonly totalGroups = this.menuState.totalGroups;
  protected readonly hasSelection = computed(() => this.groupedItems().length > 0);
  menuStateService = inject(MenuStateService);

  protected onSaveAsJson() {
    this.menuStateService.saveAsJson();
  }

  protected onSaveAsPdf() {
    const contentEl = this.analysisContentRef?.nativeElement;
    if (!contentEl) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1024,height=768');
    if (!printWindow) {
      console.error('[MenuAnalysis] Unable to open print window');
      return;
    }

    const doc = printWindow.document;
    const clone = contentEl.cloneNode(true) as HTMLElement;
    const appendStyles = () => {
      const head = doc.head ?? doc.createElement('head');
      Array.from(document.querySelectorAll<HTMLLinkElement | HTMLStyleElement>('link[rel="stylesheet"], style')).forEach(
        (node) => head.appendChild(node.cloneNode(true))
      );
      if (!doc.head) {
        doc.documentElement.appendChild(head);
      }
    };

    const render = () => {
      doc.title = 'Аналіз меню';
      doc.body.innerHTML = '';
      doc.body.className = 'menu-analysis-print';
      appendStyles();
      doc.body.appendChild(clone);
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };

    if (doc.readyState === 'complete' || doc.readyState === 'interactive') {
      render();
    } else {
      doc.addEventListener('DOMContentLoaded', render, { once: true });
    }
  }
}
