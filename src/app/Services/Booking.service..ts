import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovie } from '../Interface/IMovie';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';
import { IBooking } from '../Interface/IBooking';
import { Observable } from 'rxjs';
@Injectable({
  providedIn:'root'
  })

  export class BookingService{
  public Booking!:Observable<IBooking>;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute)// Creating a property with Variable http
  { }


//Listen what Booking to show.


  // Get Movies
  getBookings():Observable<any[]>{
  return this.http.get<any>(`${environment.baseUrl}/Booking`);
}

 getBookingById(id:number):Observable<IBooking>{
  return this.http.get<IBooking>(`${environment.baseUrl}/Booking/${id}`);
}
getBookingByUserId(id:number):Observable<IBooking[]>{
  return this.http.get<IBooking[]>(`${environment.baseUrl}/Booking/User/${id}`);
}
createBooking(booking:IBooking){
  return this.http.post<IBooking>(`${environment.baseUrl}/Booking/CreateBooking`,booking);
}
createBookingWithData(booking:IBooking){
  return this.http.post<IBooking>(`${environment.baseUrl}/Booking/CreateBookingWithData`,booking);
}
  }

