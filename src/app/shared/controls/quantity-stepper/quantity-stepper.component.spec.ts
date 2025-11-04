import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantityStepperComponent } from './quantity-stepper.component';

describe('QuantityStepperComponent', () => {
  let fixture: ComponentFixture<QuantityStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityStepperComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(QuantityStepperComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

