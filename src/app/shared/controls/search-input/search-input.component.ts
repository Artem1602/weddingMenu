import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  @Input() label = '';
  @Input() placeholder = 'Поиск...';
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();

  onInput(value: string): void {
    this.valueChange.emit(value);
  }

  clear(): void {
    this.valueChange.emit('');
  }
}
