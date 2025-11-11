import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ReportMovement {
  date: string;
  accountNumber: string;
  accountType: string;
  initialBalance: number;
  status: boolean;
  value: number;
  availableBalance: number;
}

export interface Report  {
  clientName: string;
  movements: ReportMovement[];
  pdfBase64: string;
}

@Injectable({ providedIn: 'root' })
export class ReportsService {

  private apiUrl = `${environment.apiUrl}/reportes`;

  constructor(private http: HttpClient) {}

  getReport(clientId: number, startDate: string, endDate: string): Observable<Report> {
    const params = `?clientId=${clientId}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<Report>(`${this.apiUrl}${params}`);
  }

  downloadPdf(base64: string, fileName: string): void {
    const linkSource = `data:application/pdf;base64,${base64}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = `${fileName}.pdf`;
    downloadLink.click();
  }
}
