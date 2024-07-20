import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IcomoonIconComponent } from './icomoon-icon.component';

describe('IcomoonIconComponent', () => {
  let component: IcomoonIconComponent;
  let fixture: ComponentFixture<IcomoonIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IcomoonIconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcomoonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
