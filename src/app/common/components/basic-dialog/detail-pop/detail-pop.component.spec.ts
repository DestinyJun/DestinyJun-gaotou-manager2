import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPopComponent } from './detail-pop.component';

describe('DetailPopComponent', () => {
  let component: DetailPopComponent;
  let fixture: ComponentFixture<DetailPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
