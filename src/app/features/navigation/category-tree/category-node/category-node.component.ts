import {Component, Input, signal} from '@angular/core';
import { MenuGroup, MenuItem } from '../../../../model/menu.models';
import { QuantityStepperComponent } from '../../../../shared/controls/quantity-stepper/quantity-stepper.component';
import { MenuStateService } from '../../../../core/services/menu-state.service';
import { PanelCardComponent } from '../../../../shared/ui/panel-card/panel-card.component';

@Component({
  selector: 'app-category-node',
  standalone: true,
  imports: [PanelCardComponent, QuantityStepperComponent],
  templateUrl: './category-node.component.html',
  styleUrl: './category-node.component.css'
})
export class CategoryNodeComponent {
  @Input({ required: true }) group!: MenuGroup;
  private readonly collapsed = signal(true);

  constructor(private readonly menuState: MenuStateService) {}

  protected quantityFor(item: MenuItem): number {
    return this.menuState.quantityFor(this.group.name, item.name);
  }

  protected increment(item: MenuItem): void {
    this.menuState.addOrIncrement(this.group.name, item);
  }

  protected decrement(item: MenuItem): void {
    this.menuState.decrement(this.group.name, item.name);
  }

  protected updateQuantity(item: MenuItem, quantity: number): void {
    this.menuState.setQuantity(this.group.name, item, quantity);
  }

  protected toggleCollapsed(): void {
    this.collapsed.update((value) => !value);
  }

  protected isCollapsed(): boolean {
    return this.collapsed();
  }

}
