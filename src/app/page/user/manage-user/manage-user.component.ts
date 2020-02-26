import { UserService } from './../../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  userForm
  typePage = 'create'
  headerPage = 'Create User'
  formSubmitted = false
  msg={require : 'Field is required!'}
  currrentUrl
  userId
  constructor(private fb:FormBuilder,private router:Router,private route:ActivatedRoute,private userService:UserService) {
    this.currrentUrl = this.router.url
    this.userId = this.route.snapshot.params['id']
    
   }

  ngOnInit() {    
    this.createForm()
    let url = this.currrentUrl.split("/")
    if(url.includes('edit')) this.onInitEdit()
    else if(url.includes('create')) this.onInitCreate()
    else this.onInitView() 
  }
  createForm(){
    this.userForm = this.fb.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email:['', Validators.required],
      phonenumber:['', Validators.required]
    })
  }
  onInitCreate(){
    this.headerPage = 'Create User'
    this.typePage = 'create'
  }
  onInitView(){
    this.headerPage = 'View User'
    this.typePage = 'view' 
    this.userForm.disable()
    this.userService.getById(this.userId).subscribe((res:any)=>{
        console.log('get by user id',res);
        if(res.resultCode == 200){
          let data = res.data
          this.userForm.patchValue({
            firstname:data.firstname,
            lastname:data.lastname,
            email:data.email,
            phonenumber:data.phonenumber
          })
        }
    })
  }
  onInitEdit(){
    this.headerPage = 'Edit User'
    this.typePage = 'edit'
    this.userForm.enable()
    this.userService.getById(this.userId).subscribe((res:any)=>{
        console.log('get by user id',res);
        if(res.resultCode == 200){
          let data = res.data
          this.userForm.patchValue({
            firstname:data.firstname,
            lastname:data.lastname,
            email:data.email,
            phonenumber:data.phonenumber
          })
        }
    })
  }
  onBack(){
    this.router.navigate(['/app/user'])
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
          this.onBack();
        });
      }
    })
  }
  get getValidateForm() { return this.userForm.controls; }
  
  onSave(){
    let data = this.userForm.value
    this.formSubmitted  = true
    if(this.userForm.invalid) 
      swal(
        'Field is required!',
        'You have left a field empty and a value must be entered.',
        'warning'
      );
    else if(this.typePage === 'create')
    this.userService.post(data).subscribe((res=>{
      console.log('post',res);
      if ((res as any).resultCode === 200) {
        swal(
          'Success!',
          'Your data has been saved successfully.',
          'success'
        );
        this.onBack();
      } else {
        swal(
          'Error!',
          'Internal Server Error. Please contact your administrator',
          'error'
        );
      }
      
    }))
    else if(this.typePage === 'edit')
    this.userService.put(this.userId,data).subscribe((res=>{
      console.log('put',res);
      if ((res as any).resultCode === 200) {
        swal(
          'Success!',
          'Your data has been updated successfully.',
          'success'
        );
      } else {
        swal(
          'Error!',
          'Internal Server Error. Please contact your administrator',
          'error'
        );
      }
      this.onBack();
    }))
  }

}
