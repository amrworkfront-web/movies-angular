import { Component, input } from '@angular/core';
import { movie } from '../../models/movies-by-genre';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  movie=input<movie>({}as movie)
  
}
