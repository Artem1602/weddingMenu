import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuShellComponent } from './menu-shell.component';

describe('MenuShellComponent', () => {
  let fixture: ComponentFixture<MenuShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuShellComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuShellComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

