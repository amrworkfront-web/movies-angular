import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../../services/movies';
import { MovieDetailsResponse } from '../../models/movie-details';
import { Cast } from '../../models/credits-response';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Result, Video } from '../../models/video';
import { Watchlist } from '../../services/watchlist';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {
  private movieDetailsService = inject(Movies);
  route = inject(ActivatedRoute);
  movieDetails = signal<MovieDetailsResponse>({} as MovieDetailsResponse);
  movieCrediates = signal<Cast[]>([]);
  video = signal<Result>({} as Result);
  sanitizer = inject(DomSanitizer);
  videoUrl!: SafeResourceUrl;

  watchlistService = inject(Watchlist);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      
      this.getMovieDetails(+id);

      this.getMovieCredits(+id);
      this.getMovieVideos(+id);
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.video().key}`,
      );
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
  getMovieVideos(id: number) {
    this.movieDetailsService.getMovieVideos(id).subscribe({
      next: (res) => {
        const trailer = res.results.find((v) => v.type === 'Trailer') ?? res.results[0];

        this.video.set(trailer);

        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${trailer.key}`,
        );
      },
      error: (err) => console.log(err),
    });
  }


}
