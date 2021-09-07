import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable} from 'rxjs';
import { IAuthenticationUser } from '../Interface/IAuthenticationUser';
import { IUser } from '../Interface/IUser';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'
import {UserTest}  from '../Interface/UserTest';
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
      return this.http.post(`${environment.baseUrl}User/register`,user)
   }

   update(id:number, user:IUser){
      return this.http.put(`${environment.baseUrl}/User/${id}`,user).pipe
      (map(x =>  {
        // update stored user if the logged in user updated their own record.
        if(id == this.userValue.userID){
          //update local storage user data.
          //Three dots mean that there method can get as parameters as much argument of type Object as it likes.
          const Localuser = {...this.userValue,...user};
          localStorage.setItem('user',JSON.stringify(Localuser));
          // publish updated user to subscribers
          this.userSubject.next(Localuser);
        }
        return x;
      }))
   }

   delete(id: number) {
    return this.http.delete(`${environment.baseUrl}/User/${id}`)
        .pipe(map(x => {
            // auto logout if the logged in user deleted their own record
            if (id == this.userValue.userID) {
                this.logout();
            }
            return x;
        }));
}
   getUserById(id:number){
     return this.http.get<IUser>(`${environment.baseUrl}/User/${id}`);
   }
}













