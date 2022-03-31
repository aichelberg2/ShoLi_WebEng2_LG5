import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationInformationComponent } from './application-information.component';

describe('ApplicationInformationComponent', () => {
  let component: ApplicationInformationComponent;
  let fixture: ComponentFixture<ApplicationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
