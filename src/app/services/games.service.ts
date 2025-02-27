import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { GameModel } from '../models/game-model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private functionUrl = '/.netlify/functions/games';

  constructor(private http: HttpClient) { }

  //Get all games
  getAllGames(page : number): Observable<GameModel[]> {
    return this.http.get<any[]>(`${this.functionUrl}/${page}`).pipe(
      map(data => data.map(game => new GameModel(game))) // Cada juego de la respuesta se convierte en una instancia de GameModel
    );
  }




}
