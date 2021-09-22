import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IBooking } from 'src/app/Interface/IBooking';
import { ICinemahall } from 'src/app/Interface/ICinemahall';
import { IMovie } from 'src/app/Interface/IMovie';
import { IOrderSnack } from 'src/app/Interface/IOrderSnack';
import { IPayment } from 'src/app/Interface/IPayment';
import { IShow } from 'src/app/Interface/IShow';
import { IShowSeat } from 'src/app/Interface/IShowSeat';
import { IUser } from 'src/app/Interface/IUser';
import { BookingService } from 'src/app/Services/Booking.service.';
import { CinemaHallService } from 'src/app/Services/CinemaHall.service';
import { CinemaSeatService } from 'src/app/Services/CinemaSeat.service';
import { MovieService } from 'src/app/Services/Movie.service';
import { OrderSnackService } from 'src/app/Services/OrderSnack.service';
import { PaymentService } from 'src/app/Services/Payment.service';
import { ProductService } from 'src/app/Services/Product.service';
import { ShowService } from 'src/app/Services/Show.service';
import { ShowSeatService } from 'src/app/Services/ShowSeat.service';
import { UserService } from 'src/app/Services/User.service';

@Component({
  selector: 'app-movie-ticket',
  templateUrl: './movie-ticket.component.html',
  styleUrls: ['./movie-ticket.component.css']
})
export class MovieTicketComponent implements OnInit {
  ShowID!:number;
  MovieID!:number;
  Movie!:IMovie;
  Show!:IShow;
  CinemaHall!:ICinemahall;
  ShowSeats:any =[];
  math = Math;
  normalTicket = 0;
  totalTicketPrice=0;
  softDrink=0;
  popCorn=0;
  snackMenu=0;
  totalSnackPrice=0;
  selected:boolean = false;
  selectedSeat:any;
  storedSeat!:IShowSeat[];
  storedSnacks:any =[];
  avialableSeat = 0;
  products:any = [];
  booking!:IBooking;
  user!:IUser;
  orderSnack!:IOrderSnack;
  payment!:IPayment;
  paymentID!:number;
  constructor(
    private rouite:ActivatedRoute,
    private movieContext:MovieService,
    private showContext:ShowService,
    private cinemaHallContext:CinemaHallService,
    private cinemaSeatContext:CinemaSeatService,
    private showSeatContext:ShowSeatService,
    private productContext:ProductService,
    private bookingContext:BookingService,
    private userContext:UserService,
    private orderSnackContext:OrderSnackService,
    private paymentContext:PaymentService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.userContext.user.subscribe(x=> this.user = x);
    this.totalTicketPrice=0;
   this.rouite.params.subscribe(params=> {this.ShowID = params['showID']; this.MovieID = params['movieID']});
   this.movieDetails(this.MovieID);
   this.getShow();
   this.checkIfselectedLocalStorage()
  }
  movieDetails(id:number){
    this.movieContext.getMovieById(id).subscribe((movieResult)=>
    {this.Movie = movieResult;
   });
  }
  getProducts(id:number){
    this.productContext.getProductById(id).subscribe((productResult)=>
    {
      return productResult;
    })
  }
  getShow(){
    this.showContext.getShowByShowID(this.ShowID).subscribe((showResult)=>
    {
      this.Show = showResult;
      this.getCinemaHall(showResult.cinemaHallID);
      this.getShowSeats(showResult.showID);

    })
  }
  getCinemaHall(id:number){
    this.cinemaHallContext.getCinemaHallById(id).subscribe((CinemaHallResult)=>
    {

      this.CinemaHall = CinemaHallResult;
    })
  }
  getShowSeats(id:number){
    this.showSeatContext.getShowSeatsByShowID(id).subscribe((showSeatsResult)=>
    {
      this.ShowSeats = showSeatsResult;
    })
  }

  onBooking(){
    var savedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!)|| [];
    this.storedSeat = savedSeats;

    if(this.normalTicket > 0 && this.storedSeat.length > 0){

    var newbooking = this.booking ={
      status :1,
      showID : this.Show.showID,
      timeStamp : new Date(),
      userID : this.user.userID,
      numberOfSeats : this.normalTicket
    }

    this.bookingContext.createBooking(newbooking).subscribe((bookingresult)=>
    {
      console.log(bookingresult);
      for(var i=0; i< this.storedSeat.length;i++){
        this.storedSeat[i].bookingID = bookingresult.bookingID;
        this.showSeatContext.updateShowSeat(this.storedSeat[i].showSeatID,this.storedSeat[i]).subscribe();

      }
     this.onOrderSnack(bookingresult.bookingID!);
     this.onPayment(bookingresult.bookingID!);
    });
  }

  }
  onPayment(bookingID:number){
    var totalPrice = this.totalSnackPrice+this.totalTicketPrice;
    var newPayment = this.payment ={
      amount:totalPrice,
      timeStamp:new Date(),
      paymentMethod:1,
      bookingID:bookingID,
      discountCuponID:0
    }
    this.paymentContext.createPayment(newPayment).subscribe((paymentResult)=>{
      console.log(paymentResult);
      this.paymentID = paymentResult.paymentID!;
     this.router.navigate(['/movie',this.MovieID,'show',this.ShowID,'booking', bookingID,'ticket',this.paymentID])

    })
  }
  onOrderSnack(bookingID:number){
    if(this.softDrink != 0){
      var newSnacks = this.orderSnack={
        quantity:this.softDrink,
        bookingID:bookingID,
        productID:1
      }
      this.orderSnackContext.createOrderSnack(newSnacks).subscribe(g=>console.log(g));
    }
    if(this.snackMenu != 0){
      var newSnacks = this.orderSnack={
        quantity:this.snackMenu,
        bookingID:bookingID,
        productID:5
      }
      this.orderSnackContext.createOrderSnack(newSnacks).subscribe(g=>console.log(g));

    }
    if(this.popCorn != 0){
      var newSnacks = this.orderSnack={
        quantity:this.popCorn,
        bookingID:bookingID,
        productID:2
      }
      this.orderSnackContext.createOrderSnack(newSnacks).subscribe(g=>console.log(g));

    }

  }
  convertMinuteToHour(minute:number){
    var hours = this.math.floor(minute/60);
    var minutes = minute % 60;
    var duration = hours+" H : " +minutes + "M";
    return duration;
  }

  checkIfselectedLocalStorage(){
    var storedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!)|| [];
    if(storedSeats !== null && storedSeats.length > 0){
      for(var i=0;i<storedSeats.length;i++){
        storedSeats.splice(i,2)
       localStorage.setItem("SelectedSeats", JSON.stringify(storedSeats));

        console.log(storedSeats[i]);

      }
    }
  }

  onSelected(seat:any){
    var storedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!)|| [];
    if(seat.bookingID){
      for(var i =0;i < storedSeats.length;i++){
        if(storedSeats[i].showSeatID == seat.showSeatID){
          storedSeats.splice(i,1);
        }
      }
    }
    // if(seat.bookingID == null){
    // }
    // else{
    //   seat.booked = true;
    // }
    if(seat.active==true && !seat.bookingID){
      seat.active=false;
      this.avialableSeat--;
      this.totalTicketPrice = this.totalTicketPrice-seat.price;
      for(var i =0;i < storedSeats.length;i++){
        if(storedSeats[i].showSeatID == seat.showSeatID){
          storedSeats.splice(i,1);
        }
      }
      console.log(storedSeats)
      localStorage.setItem("SelectedSeats", JSON.stringify(storedSeats));
    }
    else if(this.avialableSeat < this.normalTicket && !seat.bookingID){
      seat.active=true;
      this.avialableSeat++;
      this.totalTicketPrice = this.totalTicketPrice+seat.price;
      storedSeats.push(seat);
      localStorage.setItem("SelectedSeats", JSON.stringify(storedSeats));
    }
    console.log(seat.showSeatID);
  }

  onMinus(count:number,target:string)
  {
    count = count-1;
    if(count < 0){
      count = 0;
    }
    else{
      if(target == "normalTicket"){
        this.normalTicket = count;
      }
      else if(target == "softDrink"){
        this.softDrink = count
        this.totalSnackPrice= this.totalSnackPrice- 25;

      }
      else if(target == "popCorn"){
        this.popCorn = count
        this.totalSnackPrice= this.totalSnackPrice- 45;

      }
      else if(target == "snackMenu"){
        this.snackMenu = count
        this.totalSnackPrice= this.totalSnackPrice- 99;

      }
    }

  }
  onPlus(count:number,target:string)
  {
    count = count+1;
    if(count > 9){
      count = 9;
    }
    else{

    if(target == "normalTicket"){
      this.normalTicket = count;
    }
    else if(target == "softDrink"){
      this.softDrink = count
      this.totalSnackPrice = this.totalSnackPrice + 25;

    }
    else if(target == "popCorn"){
      this.popCorn = count
      this.totalSnackPrice = this.totalSnackPrice + 45;

    }
    else if(target == "snackMenu"){
      this.snackMenu = count
      this.totalSnackPrice = this.totalSnackPrice+ 99;
    }
  }


  }


}
