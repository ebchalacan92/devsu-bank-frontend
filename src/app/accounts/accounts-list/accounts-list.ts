import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Account, AccountsService } from '../../services/accounts';
import { Client, ClientsService } from '../../services/clients';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './accounts-list.html',
  styleUrls: ['./accounts-list.css']
})
export class AccountsList implements OnInit {

  accounts: Account[] = [];
  filteredAccounts: Account[] = [];
  clients: Client[] = [];
  searchText: string = '';

  showModal: boolean = false;
  selectedAccountId?: string;

  constructor(
    private accountsService: AccountsService,
    private clientsService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadAccounts();
  }

  loadClients(): void {
    this.clientsService.getAll().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }

  loadAccounts(): void {
    this.accountsService.getAll().subscribe({
      next: (data) => {
        this.accounts = data;
        this.filteredAccounts = data;
      },
      error: (err) => console.error('Error al obtener cuentas', err)
    });
  }

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.clientId === clientId);
    return client ? client.name : '—';
  }

  filterAccounts(): void {
    const text = this.searchText.toLowerCase();
    this.filteredAccounts = this.accounts.filter(a =>
      a.accountNumber.toLowerCase().includes(text)
    );
  }

  editAccount(accountNumber: string): void {
    this.router.navigate(['/cuentas/edit', accountNumber]);
  }

  openDeleteModal(id: string): void {
    this.selectedAccountId = id;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedAccountId = undefined;
  }

  confirmDelete(): void {
    if (!this.selectedAccountId) return;

    this.accountsService.delete(this.selectedAccountId).subscribe({
      next: () => {
        this.loadAccounts();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al eliminar cuenta', err);
        this.closeModal();
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/cuentas/new']);
  }
}
