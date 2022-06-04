import { TestBed } from '@angular/core/testing';

import { ManageHomeDataService } from './manage-home-data.service';

describe('ManageHomeDataService', () => {
  let service: ManageHomeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageHomeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
