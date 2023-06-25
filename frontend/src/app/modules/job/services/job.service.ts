import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from '../models/job.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class JobService {
  baseApiUrl: string = environment.baseApiUrl;
  entityName = 'job';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${this.baseApiUrl}/${this.entityName}`;
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.url}/getAll`);
  }

  getByQuotationId(quotationId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.url}/getByQuotationId/${quotationId}`);
  }

  getByWorksheetId(worksheetId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.url}/getByWorksheetId/${worksheetId}`);
  }

  addJob(addJobRequest: Job): Observable<Job> {
    return this.http.post<Job>(`${this.url}/create`, addJobRequest);
  }

  updateJob(id: number, addJobRequest: Job): Observable<Job> {
    return this.http.post<Job>(`${this.url}/put/${id}`, addJobRequest);
  }

  deleteJob(id: number): Observable<Job> {
    return this.http.delete<Job>(`${this.url}/delete/${id}`);
  }

}
