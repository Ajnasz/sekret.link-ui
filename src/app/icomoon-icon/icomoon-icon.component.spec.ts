import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcomoonIconComponent } from './icomoon-icon.component';

describe('IcomoonIconComponent', () => {
  let component: IcomoonIconComponent;
  let fixture: ComponentFixture<IcomoonIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcomoonIconComponent ]
    })
    .compileComponents();
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
