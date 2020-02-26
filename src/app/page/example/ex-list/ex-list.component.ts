import { Component, TemplateRef, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

import { MatDialog } from '@angular/material';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ex-list',
  templateUrl: './ex-list.component.html',
  styleUrls: ['./ex-list.component.scss']
})
export class ExListComponent implements OnInit {

  dialogRef;

  constructor(
              public dialog: MatDialog,
              private titleService:Title,) {

    this.titleService.setTitle("CMS");

  }

  ngOnInit() {
    
  }

  openConfirmDelete() {
    swal({
      title: 'Are you sure?',
      text: "You want to delete This data ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(templateRef);
  }

}
