import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

import { GamesService } from './services/games.service';
import { GameModel } from './models/game-model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mygamestracker';
  gamesList : GameModel[] = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.bringGames()
  }

  bringGames() {
    this.gamesService.getAllGames().subscribe({
      next: (data: GameModel[]) => this.gamesList = data, //Se asignan al array gamesList los juegos obtenidos
      error: (err) => console.error('Error al obtener juegos:', err)
    });
  }

}
