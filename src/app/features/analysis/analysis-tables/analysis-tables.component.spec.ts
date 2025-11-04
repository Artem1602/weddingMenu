import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisTablesComponent } from './analysis-tables.component';

describe('AnalysisTablesComponent', () => {
  let fixture: ComponentFixture<AnalysisTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisTablesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisTablesComponent);
    fixture.componentInstance.groups = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

