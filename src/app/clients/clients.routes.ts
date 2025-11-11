import { Routes } from '@angular/router';
import { ClientsList } from './clients-list/clients-list';
import { ClientsForm } from './clients-form/clients-form';

export const CLIENT_ROUTES: Routes = [
  { path: '', component: ClientsList },
  { path: 'new', component: ClientsForm },
  { path: 'edit/:id', component: ClientsForm }
];
