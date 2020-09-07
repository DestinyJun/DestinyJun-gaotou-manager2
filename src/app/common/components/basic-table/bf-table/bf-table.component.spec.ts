import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfTableComponent } from './bf-table.component';

describe('BfTableComponent', () => {
  let component: BfTableComponent;
  let fixture: ComponentFixture<BfTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
