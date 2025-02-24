import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { GamesService } from './services/games.service';
import { GameModel } from './models/game-model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mygamestracker';
  gamesList : GameModel[] = [];
  offset: number = 0;

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.bringGames()
  }

  previousPage() {
    this.offset -= 20;
    this.bringGames();
  }

  nextPage() {
    this.offset += 20;
    this.bringGames();
  }

  bringGames() {
    this.gamesService.getAllGames(this.offset).subscribe({
      next: (data: GameModel[]) => this.gamesList = data, //Se asignan al array gamesList los juegos obtenidos
      error: (err) => console.error('Error al obtener juegos:', err)
    });
  }

}
