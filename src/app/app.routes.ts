import { Routes } from '@angular/router';

import { GameListComponent } from './components/game-list/game-list.component';

export const routes: Routes = [
  {path: 'game-list', component: GameListComponent},
  {path: '', redirectTo: '/game-list', pathMatch: 'full'}
];
