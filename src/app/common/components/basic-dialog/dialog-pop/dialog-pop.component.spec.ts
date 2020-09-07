import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPopComponent } from './dialog-pop.component';

describe('DialogPopComponent', () => {
  let component: DialogPopComponent;
  let fixture: ComponentFixture<DialogPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
