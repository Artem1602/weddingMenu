import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryNodeComponent } from './category-node.component';
import { MenuStateService } from '../../../../core/services/menu-state.service';

describe('CategoryNodeComponent', () => {
  let fixture: ComponentFixture<CategoryNodeComponent>;
  let component: CategoryNodeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNodeComponent],
      providers: [MenuStateService]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryNodeComponent);
    component = fixture.componentInstance;
    component.group = { name: 'Test', items: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

