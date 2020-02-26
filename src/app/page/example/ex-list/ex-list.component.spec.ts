import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExListComponent } from './ex-list.component';

describe('ExListComponent', () => {
  let component: ExListComponent;
  let fixture: ComponentFixture<ExListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
