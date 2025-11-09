import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWrapper } from './login-wrapper';

describe('LoginWrapper', () => {
  let component: LoginWrapper;
  let fixture: ComponentFixture<LoginWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
