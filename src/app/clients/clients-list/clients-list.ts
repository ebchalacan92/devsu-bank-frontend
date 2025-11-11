import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Client, ClientsService } from '../../services/clients';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clients-list.html',
  styleUrls: ['./clients-list.css']
})
export class ClientsList implements OnInit {

  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchText: string = '';

  showModal: boolean = false;
  selectedClientId?: number;

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.filteredClients = data;
      },
      error: (err) => console.error('Error al obtener clientes', err)
    });
  }

  filterClients(): void {
    const text = this.searchText.toLowerCase();
    this.filteredClients = this.clients.filter(c =>
      c.name.toLowerCase().includes(text)
    );
  }

  editClient(id: number): void {
    this.router.navigate(['/clientes/edit', id]);
  }

  openDeleteModal(id: number): void {
    this.selectedClientId = id;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedClientId = undefined;
  }

  confirmDelete(): void {
    if (!this.selectedClientId) return;

    this.clientsService.delete(this.selectedClientId).subscribe({
      next: () => {
        this.loadClients();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al eliminar cliente', err);
        this.closeModal();
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/clientes/new']);
  }
}
