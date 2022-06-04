import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteListComponent } from './modal-delete-list.component';

describe('ModalDeleteListComponent', () => {
  let component: ModalDeleteListComponent;
  let fixture: ComponentFixture<ModalDeleteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
