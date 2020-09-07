import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePopComponent } from './file-pop.component';

describe('FilePopComponent', () => {
  let component: FilePopComponent;
  let fixture: ComponentFixture<FilePopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilePopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
