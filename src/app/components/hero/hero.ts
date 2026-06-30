import { Component, inject, signal } from '@angular/core';
import { Movies } from '../../services/movies';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private moviesService=inject(Movies)
hero = signal<Movie | undefined>(undefined);
ngOnInit(){
  this.getPopularMovies()
}
getPopularMovies() {
  this.moviesService.getPopularMovie().subscribe({
    next: (res) => {
      this.hero.set(res.results[0])
      
    },
    error: (err) => console.log(err)
  });
}
}
