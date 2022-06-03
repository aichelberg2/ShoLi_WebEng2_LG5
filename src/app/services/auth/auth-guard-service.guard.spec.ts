import { TestBed } from '@angular/core/testing';
import { AuthenticationGuard } from "./auth-guard-service.guard";

describe('AuthGuardServiceGuard', () => {
  let guard: AuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
