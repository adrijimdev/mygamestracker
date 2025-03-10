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

  filterByGenre(event : Event) {
    this.page = 1;
    this.searchString = "";
    this.genre = (event.target as HTMLSelectElement).value;
    console.log(`Genre = "${this.genre}"`);

    this.bringGames();
  }

  searchGames() {
    this.genre = "";
    this.page = 1;

    this.bringGames();
  }

  bringGames() {
    this.gamesService.getAllGames(this.page, this.genre || undefined, this.searchString || undefined).subscribe({
      // next: (data: GameModel[]) => this.gamesList = this.gamesList.concat(data), //Se asignan al array gamesList los juegos obtenidos
      next: (data : GameModel[]) => this.gamesList = data,
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
