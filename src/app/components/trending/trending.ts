import { Component, computed, inject, signal } from '@angular/core';
import { Movies } from '../../services/movies';
import { TrendingResponse } from '../../models/trending';
import { MovieCard } from "../movie-card/movie-card";
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-trending',
  imports: [MovieCard],
  templateUrl: './trending.html',
  styleUrl: './trending.css',
})
export class Trending {
  private TrendingMoviesService=inject(Movies)
  TrendingMovies=signal<TrendingResponse>({}as TrendingResponse)
pageNumber = signal(2);

pageNumber$ = toObservable(this.pageNumber);

ngOnInit() {

  this.pageNumber$
    .pipe(
      switchMap(page =>
        this.TrendingMoviesService.getTrendingMovies(page)
      ))

    
    .subscribe({

      next: res => this.TrendingMovies.set(res),

      error: err => console.log(err)

    });

}
onClick(num:number){
  this.pageNumber.set(num)
}
visiblePages = computed(() => {

  const current = this.pageNumber();

  const start = Math.max(1, current - 2);

  const end = Math.min(
    this.TrendingMovies().total_pages,
    start + 4
  );

  return Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

});
}
