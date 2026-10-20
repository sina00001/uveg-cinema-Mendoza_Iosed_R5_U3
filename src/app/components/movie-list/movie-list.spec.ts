import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list';
import { MovieService, Movie } from '../../services/movie';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { vi } from 'vitest'; // Importar las utilidades de Vitest
describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieServiceSpy: any; // Vitest no requiere el tipo SpyObj
  const mockMovies: Movie[] = [
    { id: 1, title: 'Película Test 1', overview: 'Desc 1', poster_path: '/img1.jpg', vote_average: 8.5, release_date: '2023-01-01' },
    { id: 2, title: 'Película Test 2', overview: 'Desc 2', poster_path: '/img2.jpg', vote_average: 7.2, release_date: '2022-01-01' }
  ];

  beforeEach(async () => {
    // Usar vi.fn() de Vitest para crear el mock
    const spy = {
      getTopRatedMovies: vi.fn().mockReturnValue(of({ page: 1, results: mockMovies, total_pages: 1, total_results: 2 })),
      getMovieDetail: vi.fn()
    };
    await TestBed.configureTestingModule({
      imports: [MovieListComponent, HttpClientTestingModule],
      providers: [{ provide: MovieService, useValue: spy }]
    }).compileComponents();
    movieServiceSpy = TestBed.inject(MovieService);
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
  it('debería cargar las películas al inicializar (ngOnInit)', () => {
    fixture.detectChanges();
    expect(movieServiceSpy.getTopRatedMovies).toHaveBeenCalled();
    expect(component.movies.length).toBe(2);
    expect(component.loading).toBe(false); // Vitest usa toBe(false) en lugar de toBeFalse()
  });
  it('debería renderizar una tarjeta por cada película', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.movie-card');
    expect(cards.length).toBe(2);
    expect(cards[0].textContent).toContain('Película Test 1');
  });
  it('debería actualizar selectedMovieId al hacer clic en una película', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCard = compiled.querySelector('.movie-card') as HTMLElement;
    firstCard.click();
    expect(component.selectedMovieId).toBe(1);
  });
});
