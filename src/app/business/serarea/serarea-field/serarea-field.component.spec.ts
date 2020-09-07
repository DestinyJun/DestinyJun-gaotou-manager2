import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerareaFieldComponent } from './serarea-field.component';

describe('SerareaFieldComponent', () => {
  let component: SerareaFieldComponent;
  let fixture: ComponentFixture<SerareaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerareaFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerareaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
