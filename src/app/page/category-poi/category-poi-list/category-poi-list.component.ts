import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material";
import swal from "sweetalert2";
import { AppConfigService } from "../../../app-config/app-config.service";
import { Router } from "@angular/router";
import { UserService } from "../../../service/user.service";

@Component({
  selector: "app-category-poi-list",
  templateUrl: "./category-poi-list.component.html",
  styleUrls: ["./category-poi-list.component.scss"]
})
export class CategoryPoiListComponent implements OnInit {
  //config
  config: any;
  dialogRef;
  //search field
  searchForm: FormGroup;
  itemsPerPage: number;
  arrayPerPage = [];
  configPagination = {
    itemsPerPage: 10,
    currentPage: 1
  };
  searchFilter = "";
  currentPage = 1;
  arrayPage = [];
  totalItems = 0;
  pageOffset = 0;
  pageLimit = 0;
  //list
  categoryList = [
    {
      name: "category one",
      isPublish: "date one",
      _id: "1231237912738127389"
    },
    {
      name: "category two",
      isPublish: "date two",
      _id: "1231237912738127389"
    }
  ];
  listStatus = [];

  constructor(
    private appConfigService: AppConfigService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.config = this.appConfigService.getConfig();
  }

  ngOnInit() {
    this.createSearchForm();
    this.arrayPerPage = this.config.allowedLimitRecord;
    this.itemsPerPage = this.arrayPerPage[0];
    this.listStatus = this.config.status;
  }
  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      name: this.formBuilder.control(null),
      isPublish: this.formBuilder.control(null)
    });
  }
  getCategoryList(page = 1){

  }
  search(){
    this.getCategoryList();
  }
  clear(){
    this.searchFilter = '';
    this.searchForm.reset()
    this.configPagination.currentPage = 1;
    this.getCategoryList()
  }
  addDropdownSetting(list = []) {
    let dropdownSettings = {
      singleSelection: true,
      text: "Select data",
      showCheckbox: false,
      enableSearchFilter: list.length > 3 ? true : false,
      maxHeight: 132,
      position: "bottom"
    };
    return dropdownSettings;
  }
  selectedPerPage() {
    this.configPagination.itemsPerPage = this.itemsPerPage;
    this.configPagination.currentPage = 1;
    this.getCategoryList()
  }
  pageChanged(event) {
    this.configPagination.currentPage = event;
    this.getCategoryList(event);
  }
  onNavigateByEdit(id) {
    this.router.navigate([`/category-poi/${id}/edit`]);
  }
  onNavigateByView(id) {
    this.router.navigate([`/category-poi/${id}/view`]);
  }
}
