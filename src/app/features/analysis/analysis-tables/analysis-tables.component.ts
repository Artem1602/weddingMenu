import { Component, Input } from '@angular/core';
import { SelectedGroup } from '../../../core/services/menu-state.service';

@Component({
  selector: 'app-analysis-tables',
  standalone: true,
  imports: [],
  templateUrl: './analysis-tables.component.html',
  styleUrl: './analysis-tables.component.css'
})
export class AnalysisTablesComponent {
  @Input() groups: SelectedGroup[] = [];
}
