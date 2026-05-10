import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForthHomeComponent } from './forth-home.component';

describe('ForthHomeComponent', () => {
  let component: ForthHomeComponent;
  let fixture: ComponentFixture<ForthHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForthHomeComponent]
    });
    fixture = TestBed.createComponent(ForthHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
