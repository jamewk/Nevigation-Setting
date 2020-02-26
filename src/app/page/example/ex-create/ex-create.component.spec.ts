import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExCreateComponent } from './ex-create.component';

describe('ExCreateComponent', () => {
  let component: ExCreateComponent;
  let fixture: ComponentFixture<ExCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
