import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthenticationUser } from 'src/app/Interface/IAuthenticationUser';
import { UserService } from 'src/app/Services/User.service';
import { Router,ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/Interface/IUser';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

UserForm!: FormGroup;
loading = false;
submitted = false;
  constructor(private FB:FormBuilder,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute)
  { }

  ngOnInit(): void {
    this.UserForm = this.FB.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }


AuthorizeUserLogin(Model:IUser)
{
  this.submitted = true;
  if(this.UserForm.invalid){
    return;
  }
this.loading = true;
//Pipes are simple functions to use in template expressions to accept an input value and return a transformed value.
//Pipes are useful because we can use them throughout our application, while only declaring each pipe once.
 this.userService.AuthorizeUserLogin(Model).pipe(first()).subscribe({next:() =>{
   console.log(Model);
   // get return url from query parameters or default to home page
   const returnUrl = this.route.snapshot.queryParams['returnUrl']||'/';
   this.router.navigateByUrl(returnUrl);


 },
 error:error =>{
   this.loading = false;
 }
});
}

}
