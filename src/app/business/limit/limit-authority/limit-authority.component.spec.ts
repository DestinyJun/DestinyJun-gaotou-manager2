import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitAuthorityComponent } from './limit-authority.component';

describe('LimitAuthorityComponent', () => {
  let component: LimitAuthorityComponent;
  let fixture: ComponentFixture<LimitAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
