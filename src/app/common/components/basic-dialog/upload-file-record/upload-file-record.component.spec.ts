import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileRecordComponent } from './upload-file-record.component';

describe('UploadFileRecordComponent', () => {
  let component: UploadFileRecordComponent;
  let fixture: ComponentFixture<UploadFileRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFileRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
