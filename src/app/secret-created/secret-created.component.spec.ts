import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SecretCreatedComponent } from './secret-created.component';

describe('SecretCreatedComponent', () => {
  let component: SecretCreatedComponent;
  let fixture: ComponentFixture<SecretCreatedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
