import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannertestComponent } from './scannertest.component';

describe('ScannertestComponent', () => {
  let component: ScannertestComponent;
  let fixture: ComponentFixture<ScannertestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannertestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannertestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
