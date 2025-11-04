import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuNavigationComponent } from './menu-navigation.component';

describe('MenuNavigationComponent', () => {
  let fixture: ComponentFixture<MenuNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuNavigationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuNavigationComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

