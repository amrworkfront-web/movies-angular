import { computed, Injectable, signal } from '@angular/core';
import { movie } from '../models/movies-by-genre';
import { MovieDetailsResponse } from '../models/movie-details';

@Injectable({
  providedIn: 'root',
})
export class Watchlist {
watchlist = signal<number[]>([]);

  constructor(){
    const movies=localStorage.getItem('watchlist')
    if(movies)
      this.watchlist.set(JSON.parse(movies))
  }
  private save() {
  localStorage.setItem(
    'watchlist',
    JSON.stringify(this.watchlist())
  );
}
  add(movieId:number){
    if(this.watchlist().includes(movieId))
      return
    this.watchlist.update(list=>[...list,movieId])
    this.save()
  }
  delete(movieId:number){
this.watchlist.update(ids=>ids.filter(id=>id!==movieId))

  this.save();

}
  isInWatchlist(movieId: number): boolean {
  return this.watchlist().includes(movieId);
}
  toggle(movieId:number){

    if(this.isInWatchlist(movieId))
      this.delete(movieId)
    else
      this.add(movieId)
  }
}
