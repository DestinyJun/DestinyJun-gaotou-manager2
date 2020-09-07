import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashConfigComponent } from './cash-config.component';

describe('CashConfigComponent', () => {
  let component: CashConfigComponent;
  let fixture: ComponentFixture<CashConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
