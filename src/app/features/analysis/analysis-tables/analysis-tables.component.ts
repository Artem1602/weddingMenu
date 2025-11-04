import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { SelectedGroup } from '../../../core/services/menu-state.service';

@Component({
  selector: 'app-analysis-tables',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './analysis-tables.component.html',
  styleUrl: './analysis-tables.component.css'
})
export class AnalysisTablesComponent {
  @Input() groups: SelectedGroup[] = [];
}

