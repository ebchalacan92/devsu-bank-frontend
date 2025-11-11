import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client, ClientsService } from '../services/clients';
import { ReportsService, Report } from '../services/reports'; // 👈 bien importado

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class Reports {

  clients: Client[] = [];
  selectedClientId: number | null = null;
  startDate: string = '';
  endDate: string = '';

  report: Report | null = null; 

  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private reportsService: ReportsService,
    private clientsService: ClientsService
  ) {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getAll().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }

  search(): void {
    this.errorMessage = '';
    this.report = null;

    if (!this.selectedClientId || !this.startDate || !this.endDate) {
      this.errorMessage = 'Debe seleccionar un cliente y un rango de fechas.';
      return;
    }

    this.loading = true;

    this.reportsService
      .getReport(this.selectedClientId, this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          this.report = data;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Error al obtener el reporte.';
          console.error('Error reporte', err);
        }
      });
  }

  downloadPdf(): void {
    if (!this.report?.pdfBase64) {
      return;
    }
    const name = this.report.clientName || 'Reporte';
    this.reportsService.downloadPdf(this.report.pdfBase64, name);
  }
}
