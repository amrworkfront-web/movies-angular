import { Component, inject, signal } from '@angular/core';
import {Movies as MoviesService} from '../../services/movies'
import { MoviesGenre } from "../movies-genre/movies-genre";
import { Genre } from '../../models/genre';

@Component({
  selector: 'app-movies',
  imports: [ MoviesGenre],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  private genreService=inject(MoviesService)
  genres=signal<Genre[]>([])
ngOnInit(){
  this.getGeners()
}
  getGeners(){
    this.genreService.getGenres().subscribe({
      next:(res)=>this.genres.set(res.genres),
      error:(res)=>console.log(res)
    })
  }
}
