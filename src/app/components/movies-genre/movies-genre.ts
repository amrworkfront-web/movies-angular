import { Component, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { Genre } from '../../models/genre';
import { Movies } from '../../services/movies';
import { movie } from '../../models/movies-by-genre';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-movies-genre',
  imports: [MovieCard],
  templateUrl: './movies-genre.html',
  styleUrl: './movies-genre.css',
})
export class MoviesGenre {
  private moviesByGenre=inject(Movies)
  genre=input<Genre>({}as Genre)
  movies=signal<movie[]>([])
translateX = signal(0);
  ngOnInit(){
    this.getMovesByGenre()
  }
  getMovesByGenre(){
    this.moviesByGenre.getMoviesbyGenre(this.genre().id).subscribe({
      next:(res)=>this.movies.set(res.results),
      error:(res)=>console.log(res),
    })
  }

  @ViewChild('slider')
  slider!: ElementRef<HTMLDivElement>;

  next() {
    this.slider.nativeElement.scrollBy({
      left: 900,
      behavior: 'smooth'
    });
  }

  previous() {
    this.slider.nativeElement.scrollBy({
      left: -900,
      behavior: 'smooth'
    });
  }
}
