import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';
import { VehicleApi } from '../models/vehicleApi.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class VehicleService {
  baseApiUrl: string = environment.baseApiUrl;
  entityName = '/vehicle';

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<VehicleApi[]> {
    return this.http.get<VehicleApi[]>(this.baseApiUrl + this.entityName + '/getAll');
  }

  getVehiclesByCustomer(id: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseApiUrl + this.entityName + '/getallbycust?' + id);
  }

  getVehicle(id: number): Observable<VehicleApi> {
    return this.http.get<VehicleApi>(this.baseApiUrl + this.entityName + '/get/' + id);
  }

  addVehicle(addVehicleRequest: VehicleApi): Observable<VehicleApi> {
    return this.http.post<VehicleApi>(this.baseApiUrl + this.entityName + '/create', addVehicleRequest);
  }

  updateVehicle(id: number, updateVehicleRequest: VehicleApi): Observable<VehicleApi> {
    return this.http.post<VehicleApi>(this.baseApiUrl + this.entityName + '/put/' + id, updateVehicleRequest);
  }

  deleteVehicle(id: number): Observable<Vehicle> {
    return this.http.delete<Vehicle>(this.baseApiUrl + this.entityName + '/delete/' + id);
  }
}
