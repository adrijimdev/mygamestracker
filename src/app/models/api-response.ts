import { GameModel } from './game-model';

export interface ApiResponse {
  results: GameModel[]; // Lista de juegos
  next: string | null;  // URL de la siguiente página o null si es la última
}
