import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { IAuthenticationUser } from '../Interface/IAuthenticationUser';


@Injectable({
  providedIn:'root'
  })

export class UserService{
  AccessToken:string = "";
  //BaseURL TO MY API.
  baseUrl:string="https://localhost:44378/api/User/authenticate"
  constructor(private http:HttpClient){} // Creating a property with Variable http

   httpOptions = {
   Headers: new HttpHeaders({'content-Type' : 'application/json'})
   }

   AuthorizeUserLogin(model:IAuthenticationUser):Observable<IAuthenticationUser>
   {
      return this.http.post<IAuthenticationUser>(this.baseUrl,model);

   }
}













