import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { MypostsComponent } from './components/myposts/myposts.component';

export const routes: Routes = [

    {path: "", redirectTo: "signin", pathMatch : 'full' },
    {path:"register", component: RegisterComponent, },
    {path:"signin", component: SigninComponent, },
    {path:"timeline", component: TimelineComponent, },
    {path:"forgetpassword", component: ForgetpasswordComponent, },
    {path:"myposts", component: MypostsComponent, },
];
