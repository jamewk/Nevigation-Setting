import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPoiManagementComponent } from './category-poi-management.component';

describe('CategoryPoiManagementComponent', () => {
  let component: CategoryPoiManagementComponent;
  let fixture: ComponentFixture<CategoryPoiManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPoiManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPoiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
