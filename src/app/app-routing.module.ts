import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
{path:'home', component:HomeComponent},
{path:'',redirectTo: 'home', pathMatch:'full'},
{path:"login",component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'navigation',component:NavigationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
