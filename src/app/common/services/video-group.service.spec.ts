import { TestBed } from '@angular/core/testing';

import { VideoGroupService } from './video-group.service';

describe('VideoGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoGroupService = TestBed.get(VideoGroupService);
    expect(service).toBeTruthy();
  });
});
