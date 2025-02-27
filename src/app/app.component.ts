import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { GamesService } from './services/games.service';
import { GenresService } from './services/genres.service';
import { GameModel } from './models/game-model';
import { GenreModel } from './models/genre-model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mygamestracker';
  gamesList : GameModel[] = [];
  genresList : GenreModel[] = [];

  constructor(private gamesService : GamesService, private genresService : GenresService) { }

  ngOnInit() {
    // this.bringGenres();
    this.bringGames()
  }

  // previousPage() {
  //   this.offset -= 20;
  //   this.bringGames();
  // }

  // nextPage() {
  //   this.offset += 20;
  //   this.bringGames();
  // }

  // changeGenre(event : Event) {
  //   const selectedValue = (event.target as HTMLSelectElement).value;

  //   if (selectedValue === ""){
  //     this.offset = 0;
  //     this.bringGames();
  //   }
  // }

  bringGames() {
    this.gamesService.getAllGames().subscribe({
      next: (data: GameModel[]) => this.gamesList = data, //Se asignan al array gamesList los juegos obtenidos
      error: (err) => console.error('Error al obtener juegos:', err)
    });
  }

  bringGenres() {
    this.genresService.getGenres().subscribe({
      next: (data: GenreModel[]) => this.genresList = data, //Se asignan al array genresList los géneros obtenidos
      error: (err) => console.error('Error al obtener juegos:', err)
    });
  }

}
