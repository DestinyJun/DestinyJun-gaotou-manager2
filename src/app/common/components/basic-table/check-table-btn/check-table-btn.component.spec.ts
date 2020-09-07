import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTableBtnComponent } from './check-table-btn.component';

describe('CheckTableBtnComponent', () => {
  let component: CheckTableBtnComponent;
  let fixture: ComponentFixture<CheckTableBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTableBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTableBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
