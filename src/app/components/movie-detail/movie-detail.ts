import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, MovieDetail } from '../../services/movie';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css']
})
export class MovieDetailComponent implements OnChanges {
  @Input() movieId!: number;
  movie: MovieDetail | null = null;
  loading: boolean = false;
  imageBaseUrl = environment.tmdbImageUrl;

  constructor(private movieService: MovieService) {}
  // Se ejecuta cada vez que el @Input() movieId cambia
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movieId'] && this.movieId) {
      this.loadMovieDetail();
    }
  }
  loadMovieDetail(): void {
    this.loading = true;
    this.movieService.getMovieDetail(this.movieId).subscribe({
      next: (data) => {
        this.movie = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar detalle', err);
        this.loading = false;
      }
    });
  }
}