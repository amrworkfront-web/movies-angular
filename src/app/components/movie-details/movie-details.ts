import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../../services/movies';
import { MovieDetailsResponse } from '../../models/movie-details';
import { Cast } from '../../models/credits-response';
import { Watchlist } from '../../services/watchlist';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VideoCard } from "../video-card/video-card";

@Component({
  selector: 'app-movie-details',
  imports: [VideoCard],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {
   movieDetailsService = inject(Movies);
  route = inject(ActivatedRoute);
  movieDetails = signal<MovieDetailsResponse|null>(null);
  movieCrediates = signal<Cast[]>([]);
  watchlistService = inject(Watchlist);
   private destroyRef = inject(DestroyRef);
    id:string|null=null

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
       this.id = params.get('id');
      if (!this.id) return;
      
      this.getMovieDetails(+this.id);

      this.getMovieCredits(+this.id);

    });
  }
  getMovieDetails(id: number) {
    this.movieDetailsService.getMovieDetails(id).subscribe({
      next: (res) => this.movieDetails.set(res),
      error: (err) => console.log(err),
    });
  }

  getMovieCredits(id: number) {
    this.movieDetailsService.getMovieCredits(id).subscribe({
      next: (res) => this.movieCrediates.set(res.cast),
      error: (err) => console.log(err),
    });
  }


}
