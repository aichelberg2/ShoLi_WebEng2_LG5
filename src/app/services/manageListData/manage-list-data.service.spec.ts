import { TestBed } from '@angular/core/testing';

import { ManageListDataService } from './manage-list-data.service';

describe('ManageListDataService', () => {
  let service: ManageListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
