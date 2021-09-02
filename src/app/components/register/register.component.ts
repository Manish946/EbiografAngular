import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthenticationUser } from 'src/app/Interface/IAuthenticationUser';
import { UserService } from 'src/app/Services/User.service';
import { Router,ActivatedRoute, RouterModule } from '@angular/router';
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
    registerError = false;
    showErrorMessage!:string;
  constructor(
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private userService:UserService

  ) { }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
       firstname:['',Validators.required],
       lastname:['',Validators.required],
       username:['',Validators.required],
       password:['',Validators.required],
       emailaddress:['',Validators.required],
       phone:[Number,Validators.required]
    });
  }

get userForm() {return this.RegisterForm.controls;}

onRegister()
{
  this.submitted = true;
  //stop here if form is invalid
  if(this.RegisterForm.invalid){
    return;
  }
  this.loading = true;
  this.RegisterForm.value.phone = this.RegisterForm.value.phone.toString();
  this.userService.register(this.RegisterForm.value)
  .pipe(first()).subscribe({next:()=>{
    this.router.navigate(['../login'],{relativeTo: this.route});
  },
  error:error=>{
    this.loading = false;
    this.registerError = true;
  this.showErrorMessage = error.error.message;
  }
})
}

}
