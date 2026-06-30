import { Component, inject, signal } from '@angular/core';
import { MovieCard } from "../movie-card/movie-card";
import {Watchlist as watchlistService} from '../../services/watchlist'
import { forkJoin } from 'rxjs';
import { Movies } from '../../services/movies';
import { Movie } from '../../models/movie';
import { movieGenre } from '../../models/movies-by-genre';
@Component({
  selector: 'app-watchlist',
  imports: [MovieCard],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist {
  watchlist=inject(watchlistService)
  MovieService=inject(Movies)
  moviesList=this.watchlist.watchlist()
  movies=signal<movieGenre[]>([])

  ngOnInit(){
    forkJoin(
      this.moviesList.map(id=>this.MovieService.getMovie(id))
    ).subscribe({
      next:(res)=>this.movies.set(res),
      error:(err)=>console.log(err)
    })
  }
}
