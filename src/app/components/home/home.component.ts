import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import { IUser } from 'src/app/Interface/IUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user!:IUser;
  username!:string;

  ngOnInit(): void {
  }
  constructor(private userService:UserService){
    //gets this current user.
    this.userService.user.subscribe(x=> this.user = x);
    this.user = this.userService.userValue;
    this.username = this.user.userName;
  }

  logoutUser(){
    this.userService.logout();
  }
}
