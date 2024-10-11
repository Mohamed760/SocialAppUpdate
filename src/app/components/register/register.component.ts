import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerFrom:FormGroup = new FormGroup({
    name : new FormControl(null, Validators.required),
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, Validators.required),
    rePassword : new FormControl(null, Validators.required),
    dateOfBirth : new FormControl(null, Validators.required),
    gender : new FormControl(null, Validators.required),
  })

  constructor(private _UsersService:UsersService, private _Router:Router){}

  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem("currentPageSocial","/register" )
    }
  }

  submitRegister(){
    if(this.registerFrom.valid){

      this._UsersService.signUp(this.registerFrom.value).subscribe({
        next : (res)=>{
          console.log(res);
          this._Router.navigate(["/signin"])
        },

        error : (err)=>{
          console.log(err);
          
        }
      })

    }
  }

}
