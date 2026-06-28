import { Component, inject, resourceFromSnapshots, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Movies } from './services/movies';
import { Landingpage } from './components/landingpage/landingpage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('movies');
  private moviesService =inject(Movies)
    ngOnInit(){
    this.getMovies()
    }

  getMovies(){
  }
}
