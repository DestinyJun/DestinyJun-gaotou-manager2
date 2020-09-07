import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DapartComponent } from './dapart.component';

describe('DapartComponent', () => {
  let component: DapartComponent;
  let fixture: ComponentFixture<DapartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DapartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DapartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
