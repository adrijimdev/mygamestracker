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
  page : number = 1;
  genre : string = "";

  constructor(private gamesService : GamesService, private genresService : GenresService) { }

  ngOnInit() {
    this.bringGenres();
    this.bringGames()
  }

  previousPage() {
    this.page -= 1;
    this.bringGames();
  }

  nextPage() {
    this.page += 1;
    this.bringGames();
  }

  changeGenre(event : Event) {
    this.page = 1;
    this.genre = (event.target as HTMLSelectElement).value;

    this.bringGames();
  }

  bringGames() {
    if (this.genre !== "") {
      this.gamesService.getGamesByGenre(this.genre, this.page).subscribe({
        next: (data: GameModel[]) => this.gamesList = data, //Se asignan al array gamesList los juegos obtenidos
        error: (err) => console.error('Error al obtener juegos:', err)
      });
      return;
    }

    this.gamesService.getAllGames(this.page).subscribe({
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
