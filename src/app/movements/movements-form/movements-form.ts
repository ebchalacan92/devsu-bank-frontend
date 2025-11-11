import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Account, AccountsService } from '../../services/accounts';
import { Movement, MovementsService } from '../../services/movements';

@Component({
  selector: 'app-movements-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './movements-form.html',
  styleUrls: ['./movements-form.css']
})
export class MovementsForm implements OnInit {

  movementForm!: FormGroup;
  accounts: Account[] = [];

  constructor(
    private fb: FormBuilder,
    private movementsService: MovementsService,
    private accountsService: AccountsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movementForm = this.fb.group({
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      movementType: ['Deposit', Validators.required],
      value: [0, [Validators.required, Validators.min(1)]],
      balance: [0, [Validators.required, Validators.min(1)]],
      accountNumber: [null, Validators.required]
    });

    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountsService.getAll().subscribe({
      next: (data) => this.accounts = data,
      error: (err) => console.error('Error al cargar cuentas', err)
    });
  }

  onSubmit(): void {
    const movement = this.movementForm.value as Movement;
    this.movementsService.create(movement).subscribe({
      next: () => this.router.navigate(['/movimientos']),
      error: (err) => alert(err.error?.message || 'Error al registrar el movimiento')
    });
  }

  goBack(): void {
    this.router.navigate(['/movimientos']);
  }
}
