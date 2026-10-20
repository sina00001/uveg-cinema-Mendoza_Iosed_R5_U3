export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface MovieDetail extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) { }
  // Método 1: Obtener las películas mejor valoradas (Top Rated)
  getTopRatedMovies(page: number = 1): Observable<MovieResponse> {
    const url = `${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}&language=es-ES&page=${page}`;
    return this.http.get<MovieResponse>(url);
  }
  // Método 2: Obtener el detalle de una película por su ID
  getMovieDetail(id: number): Observable<MovieDetail> {
    const url = `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=es-ES`;
    return this.http.get<MovieDetail>(url);
  }
}