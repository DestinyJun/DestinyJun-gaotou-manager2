import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerareaFieldTypeComponent } from './serarea-field-type.component';

describe('SerareaFieldTypeComponent', () => {
  let component: SerareaFieldTypeComponent;
  let fixture: ComponentFixture<SerareaFieldTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerareaFieldTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerareaFieldTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
