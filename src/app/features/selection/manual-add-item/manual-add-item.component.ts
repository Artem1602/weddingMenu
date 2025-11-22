import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PanelCardComponent } from '../../../shared/ui/panel-card/panel-card.component';
import { QuantityStepperComponent } from '../../../shared/controls/quantity-stepper/quantity-stepper.component';
import { MenuStateService } from '../../../core/services/menu-state.service';
import { MenuItem } from '../../../model/menu.models';

@Component({
  selector: 'app-manual-add-item',
  standalone: true,
  imports: [FormsModule, PanelCardComponent, QuantityStepperComponent],
  templateUrl: './manual-add-item.component.html',
  styleUrl: './manual-add-item.component.css'
})
export class ManualAddItemComponent {
  private readonly menuState = inject(MenuStateService);

  protected name = '';
  protected weight = '';
  protected price = '';
  protected quantity = 1;
  protected readonly groupName = 'Додано вручну';
  protected readonly collapsed = signal(true);

  protected get canSubmit(): boolean {
    return this.name.trim().length > 0 && this.quantity > 0 && Number.isFinite(this.quantity);
  }

  protected submit(): void {
    if (!this.canSubmit) return;

    const item: MenuItem = {
      name: this.name.trim(),
      weight: this.weight.trim() || '0',
      price: this.formatPrice(this.price.trim())
    };

    this.menuState.setQuantity(this.groupName, item, Math.max(1, this.quantity));
    this.resetForm();
  }

  protected incrementQuantity(): void {
    this.quantity = this.quantity + 1;
  }

  protected decrementQuantity(): void {
    this.quantity = Math.max(1, this.quantity - 1);
  }

  protected onQuantityChange(value: number): void {
    this.quantity = Math.max(1, value);
  }

  protected toggleCollapsed(): void {
    this.collapsed.update((value) => !value);
  }

  private formatPrice(raw: string): string {
    if (!raw) return '0 грн';
    const numeric = Number(raw.replace(',', '.'));
    if (Number.isNaN(numeric)) return `${raw} грн`;
    return `${numeric} грн`;
  }

  private resetForm(): void {
    this.name = '';
    this.weight = '';
    this.price = '';
    this.quantity = 1;
  }
}
