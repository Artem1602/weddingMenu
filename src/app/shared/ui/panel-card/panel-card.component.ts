import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-card',
  standalone: true,
  templateUrl: './panel-card.component.html',
  styleUrl: './panel-card.component.css',
  host: {
    class: 'panel-card-wrapper'
  }
})
export class PanelCardComponent {}
