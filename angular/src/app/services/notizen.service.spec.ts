import { TestBed, inject } from '@angular/core/testing';

import { NotizenService } from './notizen.service';

describe('NotizenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotizenService]
    });
  });

  it('should be created', inject([NotizenService], (service: NotizenService) => {
    expect(service).toBeTruthy();
  }));
});
