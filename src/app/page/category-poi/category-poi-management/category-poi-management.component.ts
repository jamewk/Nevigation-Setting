import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AppConfigService } from '../../../app-config/app-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-category-poi-management',
  templateUrl: './category-poi-management.component.html',
  styleUrls: ['./category-poi-management.component.scss']
})
export class CategoryPoiManagementComponent implements OnInit {
  //config
  config: any;
  isSubmit: boolean = false;
  pageType = 'Create';
  categoryForm: FormGroup;
  subCategoryList: FormArray;
  id: string = '';
  routeUrl: string = '';
  //
  constructor(
    private appConfigService: AppConfigService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeUrl = this.router.url;
    this.id = this.route.snapshot.params['id'];
    this.config = this.appConfigService.getConfig();
  }
  ngOnInit() {
    this.createCategoryForm();
  }
  createCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      categoryName: this.formBuilder.control(null, [Validators.required]),
      isPublish: this.formBuilder.control(true),
      subCategories: this.formBuilder.array([])
    });

    this.subCategoryList = this.categoryForm.get("subCategories") as FormArray;
  }
  getSubCategoryFormGroup(index): FormGroup {
    this.subCategoryList = this.categoryForm.get("subCategories") as FormArray;
    const formGroup = this.subCategoryList.controls[index] as FormGroup;
    return formGroup;
  }
  get subCategoryFormGroup() {
    return this.categoryForm.get("subCategories") as FormArray;
  }
  createSubCategory(data = null) {
    return this.formBuilder.group({
      subCategoryName: this.formBuilder.control(data["subCategoryName"], [
        Validators.required
      ]),
      isPublish: this.formBuilder.control(data["isPublish"], [
        Validators.required
      ]),
      editable: this.formBuilder.control(data["editable"])
    });
  }
  addSubCategory(){
    let check = false;
    this.subCategoryList.controls.map((value, index) => {
      if (value.get("editable").value) {
        check = true;
      }
    });
    if (check) {
      return;
    }
    let data = {
      subCategoryName: "",
      isPublish: true,
      editable: true
    };
    this.subCategoryList.push(this.createSubCategory(data));
  }
  saveSubCategory(data, i) {
    this.subCategoryList.controls.map((value, index) => {
      value.get("editable").setValue(false);
      value.get("editable").updateValueAndValidity();
    });
  }
  editSubCategory(data, i) {
    this.subCategoryList.controls.map((value, index) => {
      if (i == index) {
        value.get("editable").setValue(true);
        value.get("editable").updateValueAndValidity();
      } else {
        value.get("editable").setValue(false);
        value.get("editable").updateValueAndValidity();
      }
    });
  }
  cancelSubCategory(data, i) {
    this.subCategoryList.controls.map((value, index) => {
      value.get("editable").setValue(false);
      value.get("editable").updateValueAndValidity();
    });
  }
  removeSubCategory(data, i) {
    swal({
      title: this.config.dialog.warning.confirmDelete.title,
      text: this.config.dialog.warning.confirmDelete.text,
      type: this.config.dialog.warning.confirmDelete.type,
      showCancelButton: this.config.dialog.warning.confirmDelete.showCancelButton,
      confirmButtonColor: this.config.dialog.warning.confirmDelete.confirmButtonColor,
      cancelButtonColor: this.config.dialog.warning.confirmDelete.cancelButtonColor,
      confirmButtonText: this.config.dialog.warning.confirmDelete.confirmButtonText
    }).then(result => {
      if (result.value) {
        this.subCategoryList.removeAt(i);
      }
    });
  }
  save(){
    console.log(this.categoryForm.value);
    this.isSubmit = true;
    if (!this.categoryForm.valid) {
      swal({
        title: this.config.dialog.warning.fieldIsRequired.title,
        text: this.config.dialog.warning.fieldIsRequired.text,
        type: this.config.dialog.warning.fieldIsRequired.type,
        showCancelButton: this.config.dialog.warning.fieldIsRequired.showCancelButton,
        confirmButtonColor: this.config.dialog.warning.fieldIsRequired.confirmButtonColor,
        confirmButtonText: this.config.dialog.warning.fieldIsRequired.confirmButtonText
      });
      return;
    }
  }

}
