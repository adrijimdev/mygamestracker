import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { GenreModel } from '../models/genre-model';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private functionUrl = '/.netlify/functions/genres';

  constructor(private http: HttpClient) { }

  // Get all genres
  getGenres(): Observable<GenreModel[]> {
      return this.http.get<any[]>(this.functionUrl).pipe(
        map(data => data.map(genre => new GenreModel(genre))) // Cada género de la respuesta se convierte en una instancia de GenreModel
      );
    }

}
