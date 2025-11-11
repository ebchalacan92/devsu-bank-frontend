import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Movement, MovementsService } from '../../services/movements';
import { Account, AccountsService } from '../../services/accounts';

@Component({
  selector: 'app-movements-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movements-list.html',
  styleUrls: ['./movements-list.css']
})
export class MovementsList implements OnInit {

  movements: Movement[] = [];
  accounts: Account[] = [];
  filteredMovements: Movement[] = [];
  searchText: string = '';

  showModal: boolean = false;
  selectedMovementId?: number;

  constructor(
    private movementsService: MovementsService,
    private accountsService: AccountsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.loadMovements();
  }

  loadAccounts(): void {
    this.accountsService.getAll().subscribe({
      next: (data) => this.accounts = data,
      error: (err) => console.error('Error al obtener cuentas', err)
    });
  }

  loadMovements(): void {
    this.movementsService.getAll().subscribe({
      next: (data) => {
        this.movements = data;
        this.filteredMovements = data;
      },
      error: (err) => console.error('Error al obtener movimientos', err)
    });
  }

  getAccountById(id: string): Account | undefined {
    return this.accounts.find(a => a.accountNumber === id);
  }

  getMovementText(movement: Movement): string {
    if (movement.value < 0) {
      return `Retiro de ${Math.abs(movement.value)}`;
    }
    return `Depósito de ${movement.value}`;
  }

  filterMovements(): void {
    const text = this.searchText.toLowerCase();
    this.filteredMovements = this.movements.filter(m =>
      this.getMovementText(m).toLowerCase().includes(text)
    );
  }

  openDeleteModal(id: number): void {
    this.selectedMovementId = id;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedMovementId = undefined;
  }

  confirmDelete(): void {
    if (!this.selectedMovementId) return;

    this.movementsService.delete(this.selectedMovementId).subscribe({
      next: () => {
        this.loadMovements();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al eliminar movimiento', err);
        this.closeModal();
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/movimientos/new']);
  }
}
