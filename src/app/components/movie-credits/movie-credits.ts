import { Component, effect, inject, input, signal } from '@angular/core';
import { Cast } from '../../models/credits-response';
import { Movies } from '../../services/movies';

@Component({
  selector: 'app-movie-credits',
  imports: [],
  templateUrl: './movie-credits.html',
  styleUrl: './movie-credits.css',
})
export class MovieCredits {
  movieDetailsService = inject(Movies);

  movieCrediates = signal<Cast[]>([]);
  id = input.required<string | null>;
  constructor() {
    effect(() => {
      const id = this.id();
      if (!id) return;
      this.getMovieCredits(+id);
    });
  }
  getMovieCredits(id: number) {
    this.movieDetailsService.getMovieCredits(id).subscribe({
      next: (res) => this.movieCrediates.set(res.cast),
      error: (err) => console.log(err),
    });
  }
}
