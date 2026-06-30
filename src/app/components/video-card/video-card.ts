import { Component, effect, inject, input, signal } from '@angular/core';
import { Movies } from '../../services/movies';
import { Result } from '../../models/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-card',
  imports: [],
  templateUrl: './video-card.html',
  styleUrl: './video-card.css',
})
export class VideoCard {
  movieDetailsService = inject(Movies);
  id = input.required<string | null>();
  video = signal<Result | null>(null);
  sanitizer = inject(DomSanitizer);
  videoUrl!: SafeResourceUrl;
  constructor() {
    effect(() => {
      const id = this.id();
      if (!id) return;

      this.getMovieVideos(+id);
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
