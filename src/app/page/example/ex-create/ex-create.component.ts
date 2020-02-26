import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert2';

// Start Quill Lib //
import Quill from 'quill'
const parchment = Quill.import('parchment')
const block = parchment.query('block')
block.tagName = 'DIV'
Quill.register(block /* or NewBlock */, true)

const colors = Quill.import('formats/color')
Quill.register(colors, true)

// End Quill Lib //

@Component({
  selector: 'app-ex-create',
  templateUrl: './ex-create.component.html',
  styleUrls: ['./ex-create.component.scss']
})
export class ExCreateComponent implements OnInit {

  public validationForm: FormGroup;
  public formSubmitted = false;

  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public dropdownSettingsSingle = {};

  constructor(private formBuilder: FormBuilder,
              private router: Router,) { }

  ngOnInit() {

    this.buildForm();

    this.dropdownList = [
      {"id":1,"itemName":"India"},
      {"id":2,"itemName":"Singapore"},
      {"id":3,"itemName":"Australia"},
      {"id":4,"itemName":"Canada"},
      {"id":5,"itemName":"South Korea"},
      {"id":6,"itemName":"Germany"},
      {"id":7,"itemName":"France"},
      {"id":8,"itemName":"Russia"},
      {"id":9,"itemName":"Italy"},
      {"id":10,"itemName":"Sweden"}
    ];
   
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select data",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit:3,
    };
    

    this.dropdownSettingsSingle = { 
      singleSelection: true, 
      text:"Select data",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit:3,
      showCheckbox:false
    };

  }

  buildForm() {
    this.validationForm = this.formBuilder.group({
      title_th: this.formBuilder.control(null, [Validators.required]),
      desc_th: this.formBuilder.control(null, [Validators.required]),
      title_en: this.formBuilder.control(null, [Validators.required]),
      desc_en: this.formBuilder.control(null, [Validators.required]),
      publish_date: this.formBuilder.control(null, [Validators.required]),
      select_option: this.formBuilder.control(null),
      select_option_single: this.formBuilder.control(null),
    });
  }

  onResetForm() {
    this.validationForm.reset();
    this.formSubmitted = false;
  }

  setFocus(event) {
    event.focus()
  }

  contentTHChange(event) {
    this.validationForm.controls['desc_th'].setValue(event.html);
  }

  contentENChange(event) {
    this.validationForm.controls['desc_en'].setValue(event.html);
  }

  onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any){
    console.log(items);
  }
  onDeSelectAll(items: any){
    console.log(items);
  }

  get getValidateForm() { return this.validationForm.controls; }

  onShowSweetError() {
    swal({
      title: 'Error!',
      text: 'Something wrong, Please try again.',
      type: 'error',
      confirmButtonText: 'Close'
    });
  }

  onSave() {

    this.formSubmitted = true;

    if (this.validationForm.invalid) {
        swal({
          title: 'Field is required!',
          text: 'You have left a field empty and a value must be entered.',
          type: 'warning',
          confirmButtonText: 'Close'
        });
        return;
    }

    try {

      swal({
        title: 'Successfully !',
        text: 'Data has been created successfully.',
        type: 'success',
        confirmButtonText: 'Close'
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/app/articles']);
        }
      })

    } catch(err) {
      swal({
        title: 'Error!',
        text: 'Something wrong, Please try again.',
        type: 'error',
        confirmButtonText: 'Close'
      });
    }
    
  }

}
