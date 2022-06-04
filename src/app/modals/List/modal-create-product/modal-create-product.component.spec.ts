import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateProductComponent } from './modal-create-product.component';

describe('ModalCreateProductComponent', () => {
  let component: ModalCreateProductComponent;
  let fixture: ComponentFixture<ModalCreateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
