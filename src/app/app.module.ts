import { NgModule, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './my-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { CategoryPoiManagementComponent } from './page/category-poi/category-poi-management/category-poi-management.component';
import { Page404Component } from './extra-pages/404/404.component';
import { Page500Component } from './extra-pages/500/500.component';
import { AppConfigService } from './app-config/app-config.service';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    AppRoutingModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AngularMultiSelectModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [
            { header: [1, 2, 3, 4, 5, 6, false] },
            { size: ["small", false, "large", "huge"] }
          ],
          ["bold", "italic", "underline", "strike", { align: [] }],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }, "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image"]
        ]
      },
      placeholder: ""
    }),
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    ExListComponent,
    ExCreateComponent,
    LoginComponent,
    ListUserComponent,
    ManageUserComponent,
    CategoryPoiListComponent,
    CategoryPoiManagementComponent,
    Page404Component,
    Page500Component
  ],
  providers: [AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log("HMR store", store);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(
      cmp => cmp.location.nativeElement
    );
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
