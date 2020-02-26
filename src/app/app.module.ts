import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './my-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Layout
import { LayoutComponent } from './layout/layout.component';
import { PreloaderDirective } from './layout/preloader.directive';
// Header
import { AppHeaderComponent } from './layout/header/header.component';
// Sidenav
import { AppSidenavComponent } from './layout/sidenav/sidenav.component';
import { ToggleOffcanvasNavDirective } from './layout/sidenav/toggle-offcanvas-nav.directive';
import { AutoCloseMobileNavDirective } from './layout/sidenav/auto-close-mobile-nav.directive';
import { AppSidenavMenuComponent } from './layout/sidenav/sidenav-menu/sidenav-menu.component';
import { AccordionNavDirective } from './layout/sidenav/sidenav-menu/accordion-nav.directive';
import { AppendSubmenuIconDirective } from './layout/sidenav/sidenav-menu/append-submenu-icon.directive';
import { HighlightActiveItemsDirective } from './layout/sidenav/sidenav-menu/highlight-active-items.directive';
// Footer
import { AppFooterComponent } from './layout/footer/footer.component';

// Pages
import { DashboardComponent } from './dashboard/dashboard.component';

// Sub modules
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

// hmr
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { ExListComponent } from './page/example/ex-list/ex-list.component';
import { ExCreateComponent } from './page/example/ex-create/ex-create.component';

//Import Third party
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';


import { LoginComponent } from './page/example/login/login.component';
import { ListUserComponent } from './page/user/list-user/list-user.component';
import { ManageUserComponent } from './page/user/manage-user/manage-user.component';
import { CategoryPoiListComponent } from './page/category-poi/category-poi-list/category-poi-list.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    AppRoutingModule,

    // Sub modules
    LayoutModule,
    SharedModule,

    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    AngularMultiSelectModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] },{ 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike',{ 'align': [] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }, 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['image'],
        ]
      },
      placeholder: '',
    }),
    NgxPaginationModule,
  ],
  declarations: [
    AppComponent,
    // Layout
    LayoutComponent,
    PreloaderDirective,
    // Header
    AppHeaderComponent,
    // Sidenav
    AppSidenavComponent,
    ToggleOffcanvasNavDirective,
    AutoCloseMobileNavDirective,
    AppSidenavMenuComponent,
    AccordionNavDirective,
    AppendSubmenuIconDirective,
    HighlightActiveItemsDirective,
    // Footer
    AppFooterComponent,
    //
    DashboardComponent,
    ExListComponent,
    ExCreateComponent,
    LoginComponent,
    ListUserComponent,
    ManageUserComponent,
    CategoryPoiListComponent,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
