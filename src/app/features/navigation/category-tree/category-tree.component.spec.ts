import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryTreeComponent } from './category-tree.component';
import { MenuApiService } from '../../../core/services/menu-api.service';

class MenuApiServiceStub {
  readonly loading = () => false;
  readonly error = () => null;
  readonly groups = () => [];
  load = jasmine.createSpy().and.resolveTo();
}

describe('CategoryTreeComponent', () => {
  let fixture: ComponentFixture<CategoryTreeComponent>;
  let component: CategoryTreeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryTreeComponent],
      providers: [{ provide: MenuApiService, useClass: MenuApiServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

