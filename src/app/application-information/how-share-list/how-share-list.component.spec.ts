import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowShareListComponent } from './how-share-list.component';

describe('HowShareListComponent', () => {
  let component: HowShareListComponent;
  let fixture: ComponentFixture<HowShareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowShareListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowShareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
