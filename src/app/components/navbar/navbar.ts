import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Movies } from '../../services/movies';
import { Movie } from '../../models/movie';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private searchService=inject(Movies)
  movies=signal<Movie[]>([])
  searchControl = new FormControl('');
ngOnInit() {

  this.searchControl.valueChanges.pipe(
    debounceTime(900),
    distinctUntilChanged(),

    switchMap(searchTerm =>
      this.searchService.searchMovies(searchTerm ?? '')
    )
    ,
    takeUntilDestroyed()

  ).subscribe({
    next: (res) => this.movies.set(res.results),
    error: err => console.error(err)
  });

}
}
