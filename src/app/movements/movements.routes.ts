import { Routes } from '@angular/router';
import { MovementsList } from './movements-list/movements-list';
import { MovementsForm } from './movements-form/movements-form';

export const MOVEMENT_ROUTES: Routes = [
  { path: '', component: MovementsList },
  { path: 'new', component: MovementsForm }
];
