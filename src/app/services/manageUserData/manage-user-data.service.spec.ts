import { TestBed } from '@angular/core/testing';

import { ManageUserDataService } from './manage-user-data.service';

describe('ManageUserDataService', () => {
  let service: ManageUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
