import { Routes } from '@angular/router';
import { AccountsList } from './accounts-list/accounts-list';
import { AccountsForm } from './accounts-form/accounts-form';

export const ACCOUNT_ROUTES: Routes = [
  { path: '', component: AccountsList },
  { path: 'new', component: AccountsForm },
  { path: 'edit/:id', component: AccountsForm }
];
