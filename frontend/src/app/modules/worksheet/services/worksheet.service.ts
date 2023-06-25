import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Worksheet } from '../models/worksheet.model';

@Injectable({providedIn: 'root'})
export class WorksheetService {
  baseApiUrl: string = environment.baseApiUrl;
  entityName = 'worksheet';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${this.baseApiUrl}/${this.entityName}`;
  }

  getById(id: number): Observable<Worksheet> {
    return this.http.get<Worksheet>(`${this.url}/get/${id}`);
  }

  getAllWorksheets(): Observable<Worksheet[]> {
    return this.http.get<Worksheet[]>(`${this.url}/getAll`);
  }

  getByCustomerId(customerId: number): Observable<Worksheet[]> {
    return this.http.get<Worksheet[]>(`${this.url}/getByCustomerId/${customerId}`);
  }

  getByQuotationId(quotationId: number): Observable<Worksheet> {
    return this.http.get<Worksheet>(`${this.url}/getByQuotationId/${quotationId}`);
  }

  addWorksheet(addWorksheetRequest: Worksheet): Observable<Worksheet> {
    return this.http.post<Worksheet>(`${this.url}/create`, addWorksheetRequest);
  }

  updateWorksheet(id: number, updateWorksheetRequest: Worksheet): Observable<Worksheet> {
    return this.http.post<Worksheet>(`${this.url}/put/${id}`, updateWorksheetRequest);
  }
}
