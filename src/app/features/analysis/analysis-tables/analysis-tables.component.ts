import {Component, inject, Input} from '@angular/core';
import {MenuStateService, SelectedGroup} from '../../../core/services/menu-state.service';
import {parsePrice, parseWeight} from '../../../core/services/functions.util';

@Component({
  selector: 'app-analysis-tables',
  standalone: true,
  imports: [],
  templateUrl: './analysis-tables.component.html',
  styleUrl: './analysis-tables.component.css'
})
export class AnalysisTablesComponent {
  @Input() groups: SelectedGroup[] = [];
  protected readonly parsePrice = parsePrice;
  menuStateService = inject(MenuStateService);

  protected totalPrice(): number {
    let total: number = 0;
    for (const group of this.groups) {
      group.items.forEach(item => {
        total += parsePrice(item.price) * item.quantity;
      })
    }
    return total;
  }

  protected readonly parseWeight = parseWeight;
}
