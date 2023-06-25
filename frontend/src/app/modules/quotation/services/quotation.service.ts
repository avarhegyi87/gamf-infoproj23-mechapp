import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quotation } from '../models/quotation.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class QuotationService {
  baseApiUrl: string = environment.baseApiUrl;
  entityName = 'quotation';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${this.baseApiUrl}/${this.entityName}`;
  }

  getAllQuotations(): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(`${this.url}/getAll`);
  }

  getByCustomerId(customerId: number): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(`${this.url}/getByCustomerId/${customerId}`);
  }

  getByVehicleId(VehicleId: number): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(`${this.url}/getByVehicleId/${VehicleId}`);
  }

  getByState(state: number): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(`${this.url}/getByState/${state}`);
  }

  getCreatedByVehicleId(VehicleId: number): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(`${this.url}/getCreatedByVehicleId/${VehicleId}`);
  }

  getActiveByVehicleId(VehicleId: number): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(`${this.url}/getActiveByVehicleId/${VehicleId}`);
  }

  getInactiveByVehicleId(VehicleId: number): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(`${this.url}/getInactiveByVehicleId/${VehicleId}`);
  }

  getById(id: number): Observable<Quotation> {
    return this.http.get<Quotation>(`${this.url}/get/${id}`);
  }

  addQuotation(addQuotationRequest: Quotation): Observable<Quotation> {
    return this.http.post<Quotation>(`${this.url}/create`, addQuotationRequest);
  }

  updateQuotation(id: number, addQuotationRequest: Quotation): Observable<Quotation> {
    return this.http.post<Quotation>(`${this.url}/put/${id}`, addQuotationRequest);
  }

}
