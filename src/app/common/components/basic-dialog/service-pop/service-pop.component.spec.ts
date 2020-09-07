import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePopComponent } from './service-pop.component';

describe('ServicePopComponent', () => {
  let component: ServicePopComponent;
  let fixture: ComponentFixture<ServicePopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
