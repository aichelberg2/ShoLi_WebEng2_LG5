import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteProductOfListComponent } from './modal-delete-product-of-list.component';

describe('ModalDeleteProductOfListComponent', () => {
  let component: ModalDeleteProductOfListComponent;
  let fixture: ComponentFixture<ModalDeleteProductOfListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteProductOfListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteProductOfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
