import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuAnalysisComponent } from './menu-analysis.component';
import { MenuStateService } from '../../../core/services/menu-state.service';

describe('MenuAnalysisComponent', () => {
  let fixture: ComponentFixture<MenuAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAnalysisComponent],
      providers: [MenuStateService]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuAnalysisComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

