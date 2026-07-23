import { Component, effect, inject, signal } from '@angular/core';
import { MovieCard } from "../movie-card/movie-card";
import {Watchlist as WatchlistService} from '../../services/watchlist'
import { forkJoin } from 'rxjs';
import { Movies } from '../../services/movies';
import { movieGenre } from '../../models/movies-by-genre';

@Component({
  selector: 'app-watchlist',
  imports: [MovieCard],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist {
  private watchlistService = inject(WatchlistService);
  private moviesService = inject(Movies);
  movies = signal<movieGenre[]>([]);

  constructor() {
    effect(() => {
      const ids = this.watchlistService.watchlist();
      if (ids.length === 0) {
        this.movies.set([]);
        return;
      }
      forkJoin(
        ids.map(id => this.moviesService.getMovie(id))
      ).subscribe({
        next: (res) => this.movies.set(res),
        error: (err) => console.error(err),
      });
    });
  }
}
