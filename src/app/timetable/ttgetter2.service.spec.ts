import { TestBed } from '@angular/core/testing';

import { Ttgetter2Service } from './ttgetter2.service';

describe('Ttgetter2Service', () => {
  let service: Ttgetter2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ttgetter2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
