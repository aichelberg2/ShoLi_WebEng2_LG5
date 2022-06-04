import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatDoesApplComponent } from './what-does-appl.component';

describe('WhatDoesApplComponent', () => {
  let component: WhatDoesApplComponent;
  let fixture: ComponentFixture<WhatDoesApplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatDoesApplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatDoesApplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
