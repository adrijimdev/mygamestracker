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
  getAllGames(page : number, genre? : string, searchString? : string): Observable<GameModel[]> {
    let url = `${this.functionUrl}?page=${page}`;

    if (genre && genre !== undefined) {
      url += `&genre=${genre}`;
    }

    if (searchString && searchString !== undefined) {
      url += `&search=${searchString}`;
    }

    console.log(`URL = "${url}"`);

    return this.http.get<any[]>(url).pipe(
      map(data => data.map(game => new GameModel(game))) // Cada juego de la respuesta se convierte en una instancia de GameModel
    );
  }

  getGamesByGenre(genre : string, page : number): Observable<GameModel[]> {
    return this.http.get<any[]>(`${this.functionUrl}?genre=${genre}&page=${page}`).pipe(
      map(data => data.map(game => new GameModel(game))) // Cada juego de la respuesta se convierte en una instancia de GameModel
    );
  }

  searchGames(searchString : string, page : number): Observable<GameModel[]> {
    return this.http.get<any[]>(`${this.functionUrl}?search=${searchString}&page=${page}`).pipe(
      map(data => data.map(game => new GameModel(game))) // Cada juego de la respuesta se convierte en una instancia de GameModel
    );
  }




}
