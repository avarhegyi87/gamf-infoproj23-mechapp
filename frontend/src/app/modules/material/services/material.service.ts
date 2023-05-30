import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../models/material.model';

@Injectable({providedIn: 'root'})
export class MaterialService {
  baseApiUrl: string = environment.baseApiUrl;
  entityName = 'stock';
  url: string;

  constructor(private http: HttpClient) {
    this.url = this.baseApiUrl + this.entityName;
  }

  getAllMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.url}/getall`);
  }

  getMaterial(id: string): Observable<Material> {
    return this.http.get<Material>(`${this.url}/get?${id}`);
  }

  addMaterial(addMaterialRequest: Material): Observable<Material> {
    return this.http.post<Material>(`${this.url}/create`, addMaterialRequest);
  }

  updateMaterial(id: string, updateMaterialRequest: Material): Observable<Material> {
    return this.http.put<Material>(`${this.url}/put?${id}`, updateMaterialRequest);
  }

  deleteMaterial(id: string): Observable<Material> {
    return this.http.delete<Material>(`${this.url}/delete?${id}`);
  }
}