import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, Movie } from '../../services/movie';
import { MovieDetailComponent } from '../movie-detail/movie-detail';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieDetailComponent], // Importamos el componente de detalle
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  selectedMovieId: number | null = null;
  loading: boolean = true;
  error: string | null = null;
  imageBaseUrl = environment.tmdbImageUrl;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }
  loadMovies(): void {
    this.loading = true;
    this.movieService.getTopRatedMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar películas', err);
        this.error = 'No se pudieron cargar las películas. Verifica tu API Key.';
        this.loading = false;
      }
    });
  }
  // Método que se ejecuta cuando el usuario hace clic en una película
  selectMovie(id: number): void {
    this.selectedMovieId = id;
  }
}