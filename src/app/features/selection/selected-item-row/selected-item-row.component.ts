import { Component, Input } from '@angular/core';
import { MenuStateService, SelectedMenuItem } from '../../../core/services/menu-state.service';
import { QuantityStepperComponent } from '../../../shared/controls/quantity-stepper/quantity-stepper.component';

@Component({
  selector: 'app-selected-item-row',
  standalone: true,
  imports: [QuantityStepperComponent],
  templateUrl: './selected-item-row.component.html',
  styleUrl: './selected-item-row.component.css'
})
export class SelectedItemRowComponent {
  @Input({ required: true }) item!: SelectedMenuItem;

  constructor(private readonly menuState: MenuStateService) {}

  protected increment(): void {
    this.menuState.addOrIncrement(this.item.groupName, this.item);
  }

  protected decrement(): void {
    this.menuState.decrement(this.item.groupName, this.item.name);
  }

  protected update(quantity: number): void {
    this.menuState.setQuantity(this.item.groupName, this.item, quantity);
  }

  protected remove(): void {
    this.menuState.remove(this.item.groupName, this.item.name);
  }
}

