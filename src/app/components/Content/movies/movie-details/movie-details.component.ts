import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { IMovie } from 'src/app/Interface/IMovie';
import { IShow } from 'src/app/Interface/IShow';
import { MovieService } from 'src/app/Services/Movie.service';
import { ShowService } from 'src/app/Services/Show.service';
import { UserService } from 'src/app/Services/User.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  MovieId!:number;
  Movie!:IMovie;
  selected!: Date;
  week = new Array(7).fill(new Date());
  shows:any =[];
  constructor(
    private rouite:ActivatedRoute,
    private movieContext:MovieService,
    private showContext:ShowService) {

    }

  ngOnInit(): void {
   this.rouite.params.subscribe(params=> this.MovieId = params['id']);
    this.movieDetails(this.MovieId);
    this.getNextWeek();
    this.getShows();
    this.selected = new Date();
    
  }

  movieDetails(id:number){
    this.movieContext.getMovieById(id).subscribe((movieResult)=>
    {this.Movie = movieResult;
    console.log(movieResult)
   });

  }

  getNextWeek(){
   var date = new Date();
    for(let i =0;i<7;i++){
      this.week[i] = new Date(date.getFullYear(),date.getMonth(),date.getDate()+i);
    }

  }

  getShows(){
    this.showContext.getShowByMovieID(this.MovieId).subscribe((showResult)=>
    { console.log(showResult);
      this.shows = showResult;
    })
  }
}
