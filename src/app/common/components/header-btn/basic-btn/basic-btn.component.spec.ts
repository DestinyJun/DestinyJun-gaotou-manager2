import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBtnComponent } from './basic-btn.component';

describe('BasicBtnComponent', () => {
  let component: BasicBtnComponent;
  let fixture: ComponentFixture<BasicBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
