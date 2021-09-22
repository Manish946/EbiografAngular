import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from 'src/app/Interface/IMovie';
import { IPayment } from 'src/app/Interface/IPayment';
import { IShow } from 'src/app/Interface/IShow';
import { BookingService } from 'src/app/Services/Booking.service.';
import { MovieService } from 'src/app/Services/Movie.service';
import { PaymentService } from 'src/app/Services/Payment.service';
import { ShowService } from 'src/app/Services/Show.service';

@Component({
  selector: 'app-booking-nav',
  templateUrl: './booking-nav.component.html',
  styleUrls: ['./booking-nav.component.css']
})
export class BookingNavComponent implements OnInit {
  ShowID!:number;
  MovieID!:number;
  BookingID!:number;
  PaymentID!:number;
  Movie!:IMovie;
  Payment!:IPayment;
  Show!:IShow;
  constructor(
    private route:ActivatedRoute,
    private movieContext:MovieService,
    private showContext:ShowService,
    private bookingContext:BookingService,
    private paymentContext:PaymentService,
    private router:Router


    ) { }

  ngOnInit(): void {
   this.route.params.subscribe(params=> {this.ShowID = params['showID']; this.MovieID = params['movieID'];this.BookingID =params['bookingID'], this.PaymentID =params['ticketID']});
    console.log(this.ShowID,this.MovieID,this.BookingID)
    this.getMovie();
    this.getPayment();
    this.getShow()
  }

  getShow(){
    this.showContext.getShowByShowID(this.ShowID).subscribe((showResult)=>
    {
      this.Show = showResult;
    }
    );
  }

  getMovie(){
    this.movieContext.getMovieById(this.MovieID).subscribe((movieResult)=>
    {
      this.Movie = movieResult;
      console.log(movieResult);
    });


  }
  getPayment(){
    this.paymentContext.getPaymentById(this.PaymentID).subscribe((paymentResult)=>{
      this.Payment = paymentResult;
    })
  }

  onPay(){

  }
}
