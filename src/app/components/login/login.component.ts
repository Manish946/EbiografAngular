import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IAuthenticationUser } from 'src/app/Interface/IAuthenticationUser';
import { UserService } from 'src/app/Services/User.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
UserID:number = 0;

LoginParam! : IAuthenticationUser;
username!:string;
password!:string;
UserForm = this.FB.group({
  username:['',Validators.required],
  password:['',Validators.required]
})

  constructor(private FB:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {

  }

AuthorizeUserLogin(Model:IAuthenticationUser)
{
 this.userService.AuthorizeUserLogin(Model).subscribe(data => {
   this.LoginParam = Model;
   this.userService.AccessToken = this.LoginParam.token;
   this.router.navigate(['/homePage']);
   console.log(data);
  });
}

}
