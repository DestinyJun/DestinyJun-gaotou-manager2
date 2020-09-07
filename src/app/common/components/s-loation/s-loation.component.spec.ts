import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SLoationComponent } from './s-loation.component';

describe('SLoationComponent', () => {
  let component: SLoationComponent;
  let fixture: ComponentFixture<SLoationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SLoationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SLoationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
