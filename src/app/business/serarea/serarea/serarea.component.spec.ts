import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerareaComponent } from './serarea.component';

describe('SerareaComponent', () => {
  let component: SerareaComponent;
  let fixture: ComponentFixture<SerareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
