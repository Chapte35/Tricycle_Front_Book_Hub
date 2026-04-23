import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanReturn } from './loan-return';

describe('LoanReturn', () => {
  let component: LoanReturn;
  let fixture: ComponentFixture<LoanReturn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanReturn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanReturn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
