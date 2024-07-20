import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageLogoComponent } from './page-logo.component';

describe('PageLogoComponent', () => {
  let component: PageLogoComponent;
  let fixture: ComponentFixture<PageLogoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PageLogoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
