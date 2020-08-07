import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretWriterComponent } from './secret-writer.component';

describe('SecretWriterComponent', () => {
  let component: SecretWriterComponent;
  let fixture: ComponentFixture<SecretWriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretWriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
