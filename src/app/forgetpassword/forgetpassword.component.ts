import { Component, OnInit } from '@angular/core';
import { UsersService } from '../core/services/users.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent implements OnInit {


  constructor(private _UsersService:UsersService, private _Router:Router){}

  forgetPasswordForm:FormGroup = new FormGroup({
    password : new FormControl(null, Validators.required),
    newPassword : new FormControl(null, Validators.required)
  })



  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem("currentPageSocial","/forgetpassword" )
    }
  }

  submitChangePassword(){
    this._UsersService.changePassword(this.forgetPasswordForm.value).subscribe({

      next : (res)=>{
        console.log(res);
        this._Router.navigate(["/timeline"]);
      }, 

      error : (err)=> {
        console.log(err);
      }
      
    })
  }


}
