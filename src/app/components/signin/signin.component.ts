import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {

signinFrom:FormGroup = new FormGroup ({
  email : new FormControl(null, [Validators.required, Validators.email]),
  password : new FormControl(null, Validators.required)
})

constructor(private _UsersService:UsersService, private _Router:Router){}

ngOnInit(): void {
  if (typeof localStorage != "undefined") {
    localStorage.setItem("currentPageSocial","/signin" )
  }
}

submitSignIn(){

  this._UsersService.signIn(this.signinFrom.value).subscribe({

    next : (res)=>{
      console.log(res);
          localStorage.setItem("userTokenSocial", res.token);
          this._UsersService.decodeUserData()
          this._Router.navigate(["/timeline"]);
    },

    error : (err)=>{
      console.log(err);
      
    }
         
  })

}

navigateToCreateAccount(){
  this._Router.navigate(["/register"]);
}

navigateToForgetPassword(){
  this._Router.navigate(["/forgetpassword"]);
}

}
