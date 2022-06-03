import { TestBed } from '@angular/core/testing';

import { ManageProductDataService } from './manage-product-data.service';

describe('ManageProductDataService', () => {
  let service: ManageProductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageProductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
