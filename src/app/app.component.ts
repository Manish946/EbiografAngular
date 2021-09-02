import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User.service';
import { IUser } from 'src/app/Interface/IUser';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title= "Ebiograf"
  user!:IUser;
  test!:string;
  constructor(private userService:UserService, private router:Router){
    //gets this current user.
    this.userService.user.subscribe(x=> this.user = x);
    this.user = this.userService.userValue;
  }
  ngOnInit(): void {}


}
