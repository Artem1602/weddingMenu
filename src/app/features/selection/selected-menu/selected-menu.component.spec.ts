import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedMenuComponent } from './selected-menu.component';
import { MenuStateService } from '../../../core/services/menu-state.service';

describe('SelectedMenuComponent', () => {
  let fixture: ComponentFixture<SelectedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedMenuComponent],
      providers: [MenuStateService]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedMenuComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

