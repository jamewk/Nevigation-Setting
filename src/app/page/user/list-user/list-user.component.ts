import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users = []

  offset = 0
  rowCount = 0
  limit = 10
  page = 1
  sortOrderAsc = true
  sortColumn = 'firstname'
  userstempSearchValue = {}

  userForm
  constructor(private fb: FormBuilder,private userService:UserService) { }

  ngOnInit() {
    this.createForm()
    this.onLoad()
  }

  createForm(){
    this.userForm = this.fb.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      phonenumber:['']
    })
  }
  onLoad(){
    this.userService.get(this.page,this.limit,this.offset,this.userstempSearchValue,this.sortColumn,this.sortOrderAsc).subscribe((res:any)=>{
      console.log('onLoad',res);
      if(res.resultCode == 200)  {
        this.users = res.data
        this.rowCount = res.rowCount
      }          
    },err=>{
      console.log('something wrong',err); 
    })
  }
  onSort(col){
    if(col==this.sortColumn) this.sortOrderAsc = !this.sortOrderAsc
    else {
      this.sortColumn = col
      this.sortOrderAsc = true
    }
    this.onLoad()
  }
  onChangelimit(){
    this.page =1
    this.offset = 0
    this.onLoad()
  }
  onChangePage(e) {
    this.page = e
    this.offset = (this.page-1) * this.limit
    this.onLoad()
  }
  onSearch(){
    this.userstempSearchValue = this.userForm.value
    this.onLoad()
  }
  onClearSearch(){
    this.page = 1
    this.offset = 0
    this.userstempSearchValue = {}
    this.userForm.reset()
    this.onLoad()
  }
  onConfirmDelete(id) {
    swal({
      title: 'Are you sure!',
      text: 'You want to delete this data?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.userService.delete(id).subscribe(res => {
          console.log('delete',res);
          if ((res as any).resultCode === 200) {
            swal(
              'Success!',
              'Your data has been deleted successfully.',
              'success'
            );
          } else {
            swal(
              'Error!',
              'Internal Server Error. Please contact your administrator',
              'error'
            );
          }
          this.onLoad();
        });
      }
    })
  }
}
