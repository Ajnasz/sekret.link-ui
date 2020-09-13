import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APIDocumentationComponent } from './apidocumentation.component';

describe('APIDocumentationComponent', () => {
  let component: APIDocumentationComponent;
  let fixture: ComponentFixture<APIDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APIDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APIDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
