import { Routes } from '@angular/router';
import { CLIENT_ROUTES } from './clients/clients.routes';
import { ACCOUNT_ROUTES } from './accounts/accounts.routes';
import { MOVEMENT_ROUTES } from './movements/movements.routes';
import { REPORT_ROUTES } from './reports/reports.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', children: CLIENT_ROUTES },
  { path: 'cuentas', children: ACCOUNT_ROUTES },
  { path: 'movimientos', children: MOVEMENT_ROUTES },
  { path: 'reportes', children: REPORT_ROUTES }
];
