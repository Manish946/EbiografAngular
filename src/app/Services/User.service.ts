import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable} from 'rxjs';
import { IAuthenticationUser } from '../Interface/IAuthenticationUser';
import { IUser } from '../Interface/IUser';
import { Router,ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn:'root'
  })

export class UserService{
  public user!: Observable<IUser>;
  // This will be used to save data locally for token usages.
   private userSubject!:BehaviorSubject<IUser>;
  //URL TO MY API Authentication.
  authUrl:string="https://localhost:44378/api/User/authenticate"
  // BaseURL
  baseUrl:string="https://localhost:44378/api/User"
  localUser!:IUser;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute)// Creating a property with Variable http
  {
    // Returns the localstored user and added in userSubject.
      this.userSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
  }

  // Getting current user value.
  public get userValue():IUser{
     return this.userSubject.value;
  }
   httpOptions = {
   Headers: new HttpHeaders({'content-Type' : 'application/json'})
   }


   AuthorizeUserLogin(model:IUser):Observable<IUser>
   {
      return this.http.post<IUser>(this.authUrl,model)
      .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user',JSON.stringify(user));
            this.userSubject.next(user);
            return user;
      })) ;

   }

   logout(){
     // remove user from local storage and set current user to null
     localStorage.removeItem('user');
     this.userSubject.next(null!);
     this.router.navigate(['/home'])
   }
   isAuthenticated()
   {
    this.localUser = this.userValue;
    if(this.localUser != null){
      return true;
    }
    else{
      return false;
    }
   }

   register(user:IUser){
      return this.http.post(`${this.baseUrl}/register`,user)
   }
}













