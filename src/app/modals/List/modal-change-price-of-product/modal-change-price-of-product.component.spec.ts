import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangePriceOfProductComponent } from './modal-change-price-of-product.component';

describe('ModalChangePriceOfProductComponent', () => {
  let component: ModalChangePriceOfProductComponent;
  let fixture: ComponentFixture<ModalChangePriceOfProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChangePriceOfProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangePriceOfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
