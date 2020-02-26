import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPoiListComponent } from './category-poi-list.component';

describe('CategoryPoiListComponent', () => {
  let component: CategoryPoiListComponent;
  let fixture: ComponentFixture<CategoryPoiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPoiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPoiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
