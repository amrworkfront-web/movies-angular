import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../../services/movies';
import { MovieDetailsResponse } from '../../models/movie-details';
import { Watchlist } from '../../services/watchlist';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VideoCard } from "../video-card/video-card";
import { MovieCredits } from "../movie-credits/movie-credits";

@Component({
  selector: 'app-movie-details',
  imports: [VideoCard, MovieCredits],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {
   movieDetailsService = inject(Movies);
  route = inject(ActivatedRoute);
  movieDetails = signal<MovieDetailsResponse|null>(null);
  watchlistService = inject(Watchlist);
   private destroyRef = inject(DestroyRef);
    id:string|null=null

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
       this.id = params.get('id');
      if (!this.id) return;
      
      this.getMovieDetails(+this.id);


    });
  }
  getMovieDetails(id: number) {
    this.movieDetailsService.getMovieDetails(id).subscribe({
      next: (res) => this.movieDetails.set(res),
      error: (err) => console.log(err),
    });
  }




}
