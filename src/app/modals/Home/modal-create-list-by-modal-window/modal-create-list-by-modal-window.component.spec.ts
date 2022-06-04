import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateListByModalWindowComponent } from './modal-create-list-by-modal-window.component';

describe('ModalCreateListByModalWindowComponent', () => {
  let component: ModalCreateListByModalWindowComponent;
  let fixture: ComponentFixture<ModalCreateListByModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateListByModalWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateListByModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
