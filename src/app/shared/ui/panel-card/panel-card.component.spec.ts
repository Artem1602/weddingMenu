import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelCardComponent } from './panel-card.component';

describe('PanelCardComponent', () => {
  let fixture: ComponentFixture<PanelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelCardComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

