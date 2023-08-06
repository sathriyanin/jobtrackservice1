import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderFlowComponent } from './workorder-flow.component';

describe('WorkorderFlowComponent', () => {
  let component: WorkorderFlowComponent;
  let fixture: ComponentFixture<WorkorderFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkorderFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkorderFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
