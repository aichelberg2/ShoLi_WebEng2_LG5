import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowCreateListComponent } from './how-create-list.component';

describe('HowCreateListComponent', () => {
  let component: HowCreateListComponent;
  let fixture: ComponentFixture<HowCreateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowCreateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowCreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
