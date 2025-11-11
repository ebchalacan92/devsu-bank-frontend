import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Client, ClientsService } from '../../services/clients';

@Component({
  selector: 'app-clients-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './clients-form.html',
  styleUrls: ['./clients-form.css']
})
export class ClientsForm implements OnInit {

  clientForm!: FormGroup;
  id?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      status: [true]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEditMode = true;
      this.clientsService.getById(this.id).subscribe(c => this.clientForm.patchValue(c));
    }
  }

  isInvalid(field: string): boolean {
    const control = this.clientForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const client = this.clientForm.value as Client;
    if (this.isEditMode && this.id) {
      this.clientsService.update(this.id, client).subscribe(() => this.router.navigate(['/clientes']));
    } else {
      this.clientsService.create(client).subscribe(() => this.router.navigate(['/clientes']));
    }
  }
}
