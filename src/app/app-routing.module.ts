import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/Content/profile/profile.component';
import { EditProfileComponent } from './components/Profile-content/edit-profile/edit-profile.component';
const routes: Routes = [
{path:'home', component:HomeComponent},
{path:'',redirectTo: 'home', pathMatch:'full'},
{path:"login",component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'app',component:AppComponent},
{path:'profile',component:ProfileComponent,canActivate:[AuthGuard],children:[
  {
    path:'edit-profile',component:EditProfileComponent,outlet:'profile-content'
  }
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
