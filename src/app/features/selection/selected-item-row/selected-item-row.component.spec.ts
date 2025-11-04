import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedItemRowComponent } from './selected-item-row.component';
import { MenuStateService } from '../../../core/services/menu-state.service';

describe('SelectedItemRowComponent', () => {
  let fixture: ComponentFixture<SelectedItemRowComponent>;
  let component: SelectedItemRowComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedItemRowComponent],
      providers: [MenuStateService]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedItemRowComponent);
    component = fixture.componentInstance;
    component.item = {
      groupName: 'Test',
      name: 'Item',
      price: '100',
      weight: '100g',
      quantity: 1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

