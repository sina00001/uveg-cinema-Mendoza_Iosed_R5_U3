import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie';
import { environment } from '../../environments/environment';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no queden peticiones pendientes
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener las películas mejor valoradas (GET)', () => {
    const mockResponse = {
      page: 1,
      results: [
        { id: 1, title: 'Pelicula 1', overview: '', poster_path: '', vote_average: 8.5, release_date: '2023-01-01' }
      ],
      total_pages: 1,
      total_results: 1
    };

    service.getTopRatedMovies().subscribe(response => {
      expect(response.results.length).toBe(1);
      expect(response.results[0].title).toBe('Pelicula 1');
    });

    const req = httpMock.expectOne(
      `${environment.tmdbBaseUrl}/movie/top_rated?api_key=${environment.tmdbApiKey}&language=es-ES&page=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería obtener el detalle de una película por ID (GET)', () => {
    const movieId = 550;
    const mockDetail = {
      id: 550, title: 'Fight Club', overview: '...', poster_path: '',
      vote_average: 8.4, release_date: '1999-10-15', runtime: 139,
      genres: [{ id: 18, name: 'Drama' }], tagline: '...', status: 'Released', budget: 0, revenue: 0
    };

    service.getMovieDetail(movieId).subscribe(response => {
      expect(response.title).toBe('Fight Club');
      expect(response.runtime).toBe(139);
    });

    const req = httpMock.expectOne(
      `${environment.tmdbBaseUrl}/movie/${movieId}?api_key=${environment.tmdbApiKey}&language=es-ES`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockDetail);
  });
});