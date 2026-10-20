import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail';
import { MovieService, MovieDetail } from '../../services/movie';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { vi } from 'vitest'; // 1. Importamos vi de Vitest
describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let movieServiceSpy: any; // 2. Quitamos el tipo jasmine.SpyObj
  const mockDetail: MovieDetail = {
    id: 550, title: 'Fight Club', overview: 'Un oficinista...', poster_path: '/poster.jpg',
    vote_average: 8.4, release_date: '1999-10-15', runtime: 139,
    genres: [{ id: 18, name: 'Drama' }], tagline: 'La primera regla...', status: 'Released', budget: 0, revenue: 0
  };
  beforeEach(async () => {
    // 3. Usamos vi.fn() para crear los mocks
    const spy = {
      getTopRatedMovies: vi.fn(),
      getMovieDetail: vi.fn().mockReturnValue(of(mockDetail))
    };
    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent, HttpClientTestingModule],
      providers: [{ provide: MovieService, useValue: spy }]
    }).compileComponents();
    movieServiceSpy = TestBed.inject(MovieService);
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
  });
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
  it('debería cargar el detalle cuando el @Input() movieId cambia', () => {
    component.movieId = 550;
    // Simulamos el objeto SimpleChanges que dispara ngOnChanges
    component.ngOnChanges({
      movieId: {
        currentValue: 550,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    expect(movieServiceSpy.getMovieDetail).toHaveBeenCalledWith(550);
    expect(component.movie).toEqual(mockDetail);
    // 4. Si tenías expect(component.loading).toBeFalse(); cámbialo por:
    expect(component.loading).toBe(false);
  });
  it('debería renderizar el título de la película en el HTML', () => {
    component.movieId = 550;
    component.ngOnChanges({
      movieId: {
        currentValue: 550, previousValue: undefined, firstChange: true, isFirstChange: () => true
      }
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Fight Club');
    expect(compiled.querySelector('.overview')?.textContent).toContain('Un oficinista');
  });
});
