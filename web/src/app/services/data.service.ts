import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../environments/environments';
import { ApiResponse, CreateUser, EditingTask } from '../modules/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getTasks(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${env.API_URL}tasks`);
  }

  deleteTask(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${env.API_URL}tasks/${id}`);
  }

  completeTask(id: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${env.API_URL}tasks/${id}`, { "state": "completado" });
  }

  pendingTask(id: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${env.API_URL}tasks/${id}`, { "state": "pendiente" });
  }

  editTask(id: string, task: EditingTask): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${env.API_URL}tasks/${id}`, task);
  }

  addTask(task: EditingTask): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${env.API_URL}tasks`, task);
  }

  findUser(email: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${env.API_URL}users/${email}`);
  }

  addUser(user: CreateUser): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${env.API_URL}users`, user);
  }
}
