import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { GamesService } from '../../services/games.service';
import { GenresService } from '../../services/genres.service';
import { GameModel } from '../../models/game-model';
import { GenreModel } from '../../models/genre-model';

@Component({
  selector: 'game-list',
  imports: [NgFor, NgIf, FormsModule, RouterModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  gamesList : GameModel[] = [];
  genresList : GenreModel[] = [];
  page : number = 1;
  genre : string = "";
  searchString : string = "";

  constructor(private gamesService : GamesService, private genresService : GenresService) { }

  ngOnInit() {
    this.bringGenres();
    this.bringGames();
    console.log(`searchString = "${this.searchString}"`);
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

  searchGame() {
    this.gamesService.searchGames(this.searchString).subscribe({
      next: (data: GameModel[]) => this.gamesList = data, //Se asignan al array gamesList los juegos obtenidos
      error: (err) => console.error('Error al obtener juegos:', err)
    });
  }

}
