import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-stepper',
  standalone: true,
  templateUrl: './quantity-stepper.component.html',
  styleUrl: './quantity-stepper.component.css'
})
export class QuantityStepperComponent {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max: number | null = null;
  @Input() step = 1;

  @Output() valueChange = new EventEmitter<number>();
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();

  onIncrement(): void {
    if (this.max !== null && this.value + this.step > this.max) return;
    this.increment.emit();
  }

  onDecrement(): void {
    if (this.value - this.step < this.min) return;
    this.decrement.emit();
  }

  onInput(value: string): void {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      this.emitValue(this.min);
      return;
    }
    const clamped = this.clamp(parsed);
    this.emitValue(clamped);
  }

  private emitValue(value: number): void {
    this.valueChange.emit(this.clamp(value));
  }

  private clamp(value: number): number {
    const lower = Math.max(this.min, value);
    if (this.max === null) return lower;
    return Math.min(this.max, lower);
  }
}
