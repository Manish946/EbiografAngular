import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthenticationUser } from 'src/app/Interface/IAuthenticationUser';
import { UserService } from 'src/app/Services/User.service';
import { Router,ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/Interface/IUser';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    RegisterForm!:FormGroup;
    loading = false;
    submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

}
