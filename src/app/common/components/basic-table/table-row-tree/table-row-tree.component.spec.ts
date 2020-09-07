import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowTreeComponent } from './table-row-tree.component';

describe('TableRowTreeComponent', () => {
  let component: TableRowTreeComponent;
  let fixture: ComponentFixture<TableRowTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRowTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
