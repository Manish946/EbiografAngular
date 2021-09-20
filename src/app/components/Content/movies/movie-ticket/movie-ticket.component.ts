import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { IMovie } from 'src/app/Interface/IMovie';
import { IShow } from 'src/app/Interface/IShow';
import { MovieService } from 'src/app/Services/Movie.service';
import { ShowService } from 'src/app/Services/Show.service';
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
  math = Math;
  normalTicket = 0;
  softDrink=0;
  popCorn=0;
  snackMenu=0;
  selected:boolean = false;
  constructor(
    private rouite:ActivatedRoute,
    private movieContext:MovieService,
    private showContext:ShowService
    ) { }

  ngOnInit(): void {
   this.rouite.params.subscribe(params=> {this.ShowID = params['showID']; this.MovieID = params['movieID']});
   this.movieDetails(this.MovieID);
   this.getShow();
  }

  movieDetails(id:number){
    this.movieContext.getMovieById(id).subscribe((movieResult)=>
    {this.Movie = movieResult;
    console.log(movieResult)
   });
  }

  getShow(){
    this.showContext.getShowByShowID(this.MovieID).subscribe((showResult)=>
    { console.log(showResult);
      this.Show = showResult;
    })
  }
  convertMinuteToHour(minute:number){
    var hours = this.math.floor(minute/60);
    var minutes = minute % 60;
    var duration = hours+" H : " +minutes + "M";
    return duration;
  }

  onSelected(){
    if(this.selected == true){
      this.selected = false;

    }
    else{
      this.selected = true;

    }
    console.log(this.selected)
  }






  onMinus(count:number,target:string)
  {
    count = count-1;
    if(count <= 0){
      count = 0;
    }
    if(target == "normalTicket"){
      this.normalTicket = count;
    }
    else if(target == "softDrink"){
      this.softDrink = count
    }
    else if(target == "popCorn"){
      this.popCorn = count
    }
    else if(target == "snackMenu"){
      this.snackMenu = count
    }

  }
  onPlus(count:number,target:string)
  {
    count = count+1;
    if(count >= 9){
      count = 9;
    }
    if(target == "normalTicket"){
      this.normalTicket = count;
    }
    else if(target == "softDrink"){
      this.softDrink = count
    }
    else if(target == "popCorn"){
      this.popCorn = count
    }
    else if(target == "snackMenu"){
      this.snackMenu = count
    }


  }


}
