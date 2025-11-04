import { Component } from '@angular/core';
import { MenuShellComponent } from './core/layout/menu-shell/menu-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
