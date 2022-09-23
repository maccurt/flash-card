import { TestBed } from '@angular/core/testing';

import { VerbGroupService } from './verb-group.service';

describe('VerbGroupService', () => {
  let service: VerbGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerbGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
