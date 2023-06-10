import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class VehicleService {
  baseApiUrl: string = environment.baseApiUrl;
  entityName = 'vehicle';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${this.baseApiUrl}/${this.entityName}`;
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.url}/getAll`);
  }

  getVehiclesByCustomer(id: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`'${this.url}/getallbycust?${id}`);
  }

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.url}/get/${id}`);
  }

  addVehicle(addVehicleRequest: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.url}/create`, addVehicleRequest);
  }

  updateVehicle(id: number, updateVehicleRequest: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.url}/put/${id}`, updateVehicleRequest);
  }

  deleteVehicle(id: number): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${this.url}/delete/${id}`);
  }
}
