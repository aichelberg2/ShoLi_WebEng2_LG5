import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddProductToListComponent } from './modal-add-product-to-list.component';

describe('ModalAddProductToListComponent', () => {
  let component: ModalAddProductToListComponent;
  let fixture: ComponentFixture<ModalAddProductToListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddProductToListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddProductToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
