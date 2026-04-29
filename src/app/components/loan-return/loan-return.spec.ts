import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanReturnComponent } from './loan-return';

describe('LoanReturn', () => {
  let component: LoanReturnComponent;
  let fixture: ComponentFixture<LoanReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanReturnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
