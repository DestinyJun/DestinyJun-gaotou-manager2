import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPopComponent } from './review-pop.component';

describe('ReviewPopComponent', () => {
  let component: ReviewPopComponent;
  let fixture: ComponentFixture<ReviewPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
