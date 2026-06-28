import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie, MoviesResponse } from '../models/movie';
import { GenreResponse } from '../models/genre';
import { MoviesByGenre } from '../models/movies-by-genre';
import { MovieDetailsResponse } from '../models/movie-details';
import { CreditsResponse } from '../models/credits-response';
import { Video } from '../models/video';
import { TrendingResponse } from '../models/trending';

@Injectable({
  providedIn: 'root',
})
export class Movies {
  private http=inject(HttpClient)
getPopularMovie(): Observable<MoviesResponse> {
  return this.http.get<MoviesResponse>(
    '/movie/popular'
  );
}
 getPopularMovies () {
  return this.http.get(`/movie/popular?page=5`);
};

getGenres():Observable<GenreResponse>{
return this.http.get<GenreResponse>('/genre/movie/list?language=en')
}
getMoviesbyGenre (genreId:number): Observable<MoviesByGenre>{
  return this.http.get<MoviesByGenre>(`/discover/movie?with_genres=${genreId}`);
};
 getTrendingMovies (page:number):Observable<TrendingResponse> {
  return this.http.get<TrendingResponse>(`/trending/movie/day?page=${page}`);
};

 getMovieDetails (id:number):Observable<MovieDetailsResponse>{
  return this.http.get<MovieDetailsResponse>(`/movie/${id}`);
};

 getMovieCredits  (id:number):Observable<CreditsResponse> {
  return this.http.get<CreditsResponse>(`/movie/${id}/credits`);
};

 getMovieVideos (id:number):Observable<Video> {
  return this.http.get<Video>(`/movie/${id}/videos`);
};
//  searchMovies () {
//   return this.http.get(`/search/movie?query=${query}`);
// };

}
