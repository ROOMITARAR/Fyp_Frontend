import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoSignupComponent } from './do-signup.component';

describe('DoSignupComponent', () => {
  let component: DoSignupComponent;
  let fixture: ComponentFixture<DoSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoSignupComponent]
    });
    fixture = TestBed.createComponent(DoSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
