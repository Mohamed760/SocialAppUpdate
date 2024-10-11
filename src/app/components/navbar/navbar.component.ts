import { Component, effect} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {

  isLogin:boolean = false;
constructor(private _UsersService:UsersService, private _Router:Router){

  effect( ()=> {
    if(this._UsersService.userData() != null){
      this.isLogin= true;
    }
    else{
      this.isLogin=false;
    }
  })

}

logout(){
  this._UsersService.logout();
}

}
