import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import { IUser } from 'src/app/Interface/IUser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user!:IUser;
  islogin = false;
  constructor(private userService:UserService, private router:Router){
    //gets this current user.
    this.userService.user.subscribe(x=> this.user = x);
    this.user = this.userService.userValue;

  }
  ngOnInit(): void {
    if(this.user){
      this.islogin = true;
    }
    console.log(this.islogin)
  }

  logoutUser(){
    this.userService.logout();
    this.islogin = false;
  }
  loginUser(){
    this.router.navigate(['/login']);
  }
}
