import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class VehicleService {
  baseApiUrl: string = environment.baseApiUrl;
  entityName = 'vehicle';

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseApiUrl + this.entityName + '/getall');
  }

  getVehiclesByCustomer(id: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseApiUrl + this.entityName + '/getallbycust?' + id);
  }

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.baseApiUrl + this.entityName + '/get?' + id);
  }

  addVehicle(addVehicleRequest: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseApiUrl + this.entityName + '/create', addVehicleRequest);
  }

  updateVehicle(id: number, updateVehicleRequest: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(this.baseApiUrl + this.entityName + '/put?' + id, updateVehicleRequest);
  }

  deleteVehicle(id: number): Observable<Vehicle> {
    return this.http.delete<Vehicle>(this.baseApiUrl + this.entityName + '/delete?' + id);
  }
}
