import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenreResponse } from '../models/genre';
import { movieGenre, MoviesByGenre } from '../models/movies-by-genre';
import { MovieDetailsResponse } from '../models/movie-details';
import { CreditsResponse } from '../models/credits-response';
import { Video } from '../models/video';
import { TrendingResponse } from '../models/trending';
import { MoviesResponse } from '../models/movie';

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
 searchMovies (query:string):Observable<MoviesResponse> {
  return this.http.get<MoviesResponse>(`/search/movie?query=${query}`);
};
getMovie(id: number): Observable<movieGenre> {
  return this.http.get<MovieDetailsResponse>(`/movie/${id}`).pipe(
    map(movie => ({
      adult: movie.adult,
      backdrop_path: movie.backdrop_path,
      genre_ids: movie.genres.map(genre => genre.id),
      id: movie.id,
      title: movie.title,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      softcore: movie.softcore,
      video: movie.video,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
    }))
  );
}
}
