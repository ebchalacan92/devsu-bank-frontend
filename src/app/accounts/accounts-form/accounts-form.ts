import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Account, AccountsService } from '../../services/accounts';
import { ClientsService, Client } from '../../services/clients';

@Component({
  selector: 'app-accounts-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './accounts-form.html',
  styleUrls: ['./accounts-form.css']
})
export class AccountsForm implements OnInit {

  accountForm!: FormGroup;
  clients: Client[] = [];
  id?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      accountNumber: ['', Validators.required],
      accountType: ['Savings', Validators.required],
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      status: [true],
      clientId: [null, Validators.required]
    });

    this.loadClients();

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEditMode = true;
      this.accountsService.getById(this.id).subscribe(a => this.accountForm.patchValue(a));
    }
  }

  loadClients(): void {
    this.clientsService.getAll().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }

  isInvalid(field: string): boolean {
    const control = this.accountForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    const account = this.accountForm.value as Account;

    if (this.isEditMode && this.id) {
      this.accountsService.update(this.id, account).subscribe(() => this.router.navigate(['/cuentas']));
    } else {
      this.accountsService.create(account).subscribe(() => this.router.navigate(['/cuentas']));
    }
  }

  goBack(): void {
    this.router.navigate(['/cuentas']);
  }
}
