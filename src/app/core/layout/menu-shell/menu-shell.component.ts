import { Component } from '@angular/core';
import { MenuNavigationComponent } from '../../../features/navigation/menu-navigation/menu-navigation.component';
import { SelectedMenuComponent } from '../../../features/selection/selected-menu/selected-menu.component';

@Component({
  selector: 'app-menu-shell',
  standalone: true,
  imports: [MenuNavigationComponent, SelectedMenuComponent],
  templateUrl: './menu-shell.component.html',
  styleUrl: './menu-shell.component.css'
})
export class MenuShellComponent {}

