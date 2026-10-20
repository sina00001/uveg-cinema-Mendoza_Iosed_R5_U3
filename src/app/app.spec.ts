import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieListComponent } from './components/movie-list/movie-list';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MovieListComponent, HttpClientTestingModule]
    }).compileComponents();
  });

  it('debería crear el componente raíz', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('debería tener el título "Cinema UVEG"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Cinema UVEG');
  });

  it('debería renderizar el encabezado con el título', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Cinema UVEG');
  });
});