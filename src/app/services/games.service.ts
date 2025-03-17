import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { GameModel } from '../models/game-model';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private functionUrl = '/.netlify/functions/games';

  constructor(private http: HttpClient) { }

  //Get all games
  getAllGames(page: number, genre?: string, searchString?: string, order? : string): Observable<{ results: GameModel[], next: string | null }> {
    let url = `${this.functionUrl}?page=${page}`;

    if (genre) {
      url += `&genre=${genre}`;
    }

    if (searchString) {
      url += `&search=${searchString}`;
    }

    if (order) {
      url += `&order=${order}`;
    }

    console.log(`URL = "${url}"`);

    return this.http.get<ApiResponse>(url).pipe(
      map(data => ({
        results: data.results.map(game => new GameModel(game)), // Cada juego de la respuesta se convierte en una instancia de GameModel
        next: data.next // Se guarda la URL de la siguiente página
      }))
    );
}


  getGamesByGenre(genre : string, page : number): Observable<GameModel[]> {
    return this.http.get<any[]>(`${this.functionUrl}?genre=${genre}&page=${page}`).pipe(
      map(data => data.map(game => new GameModel(game))) // Cada juego de la respuesta se convierte en una instancia de GameModel
    );
  }




}
