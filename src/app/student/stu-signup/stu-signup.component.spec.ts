import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuSignupComponent } from './stu-signup.component';

describe('StuSignupComponent', () => {
  let component: StuSignupComponent;
  let fixture: ComponentFixture<StuSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StuSignupComponent]
    });
    fixture = TestBed.createComponent(StuSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
