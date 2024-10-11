import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../base/enviroment';
import { signUpData } from '../interfaces/sign-up-interface';
import { signInData } from '../interfaces/sign-in-interface';
import { changePasswordData } from '../interfaces/change-password-interface';
import { LoggedUserData } from '../interfaces/get-logged-user-data';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userData:WritableSignal<any> = signal(null);

  constructor(private _HttpClient:HttpClient, private _Router:Router, @Inject(PLATFORM_ID) id:Object ) {
    if (isPlatformBrowser(id)) {
      if( localStorage.getItem("userTokenSocial")){
        this.decodeUserData();
        _Router.navigate([localStorage.getItem("currentPageSocial")])
      }

    }
   }

  signUp(data:signUpData):Observable<any>{
    return this._HttpClient.post<any>(`${Enviroment.baseUrl}/users/signup`, data);
  }

  signIn(data:signInData):Observable<any>{
    return this._HttpClient.post<any>(`${Enviroment.baseUrl}/users/signin`, data);
  }

  changePassword(data:changePasswordData):Observable<any>{
    return this._HttpClient.patch<any>(`${Enviroment.baseUrl}/users/change-password`, data);
  }

  uploadPhoto(data:object):Observable<any>{
    return this._HttpClient.put<any>(`${Enviroment.baseUrl}/users/upload-photo`, data);
  }

  getLoggedUserData():Observable<LoggedUserData>{
    return this._HttpClient.get<LoggedUserData>(`${Enviroment.baseUrl}/users/profile-data`);
  }

  decodeUserData(){
    // Decode Token
    const token = JSON.stringify( localStorage.getItem("userTokenSocial") );
    const decoded = jwtDecode(token);

    this.userData.set(decoded);
    console.log(this.userData());
    localStorage.setItem("userid", this.userData().user);
  }

  logout(){
    localStorage.removeItem("userTokenSocial");
    this.userData.set(null);
    this._Router.navigate(["signin"])
  }



}
