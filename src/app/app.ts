import { Component } from '@angular/core';
import { MovieListComponent } from './components/movie-list/movie-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent], // Importamos el componente hijo
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Cinema UVEG';
}
