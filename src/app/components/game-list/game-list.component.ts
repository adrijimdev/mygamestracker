import { Component, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

import { GamesService } from '../../services/games.service';
import { GenresService } from '../../services/genres.service';
import { GameModel } from '../../models/game-model';
import { GenreModel } from '../../models/genre-model';

@Component({
  selector: 'game-list',
  imports: [NgFor, NgIf, FormsModule, RouterModule, InfiniteScrollDirective],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  gamesList : GameModel[] = [];
  genresList : GenreModel[] = [];
  page : number = 1;
  genre : string = "";
  searchString : string = "";
  isNextPage : boolean = true;
  loadingData : boolean = false;
  isAtTop : boolean = true;

  constructor(private gamesService : GamesService, private genresService : GenresService) { }

  @HostListener('window:scroll', []) detectScroll() {
    this.isAtTop = window.scrollY === 0; // para saber si el usuario está en la parte superior de la página
  }

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
    this.loadingData = true;
    this.gamesService.getAllGames(this.page, this.genre || undefined, this.searchString || undefined).subscribe({
      // next: (data: GameModel[]) => this.gamesList = this.gamesList.concat(data), //Se asignan al array gamesList los juegos obtenidos
      next: (data) => {
        this.gamesList = this.gamesList.concat(data.results); // Guardar la lista de juegos
        if (!data.next) {
          this.isNextPage = false;
        }
        this.loadingData = false;
      },
      error: (err) => console.error('Error al obtener juegos:', err)
    });
  }

  bringGenres() {
    this.genresService.getGenres().subscribe({
      next: (data: GenreModel[]) => this.genresList = data, //Se asignan al array genresList los géneros obtenidos
      error: (err) => console.error('Error al obtener juegos:', err)
    });
  }

  onScroll() {
    if (!this.isNextPage) {
      return
    }
    this.page += 1;
    this.bringGames();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
