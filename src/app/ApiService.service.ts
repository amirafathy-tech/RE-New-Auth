import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://re-security.c0749e2.kyma.ondemand.com';

  constructor(private http: HttpClient,private authService:AuthService) { }

  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    //params: new HttpParams().set('token', user.token);
   // const options = { params, headers :new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`)};

   // const options = { params, headers };
    //console.log(options);
    console.log(this.http.get<T>(`${this.baseUrl}/${url}`));
    
    return this.http.get<T>(`${this.baseUrl}/${url}`);
  }
  
  getID<T>(url: string, id: number, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    //const options = { params, headers };
    console.log(this.http.get<T>(`${this.baseUrl}/${url}/${id}`));
    return this.http.get<T>(`${this.baseUrl}/${url}/${id}`);
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
   // const options = { headers };
    return this.http.post<T>(`${this.baseUrl}/${url}`, body);
  }

  put<T>(url: string, id: number, body: any, headers?: HttpHeaders): Observable<T> {
   // const options = { headers };
    return this.http.put<T>(`${this.baseUrl}/${url}/${id}`, body);
  }

  patch<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    //const options = { headers };
    return this.http.patch<T>(`${this.baseUrl}/${url}`, body);
  }

  delete<T>(url: string, id: number, headers?: HttpHeaders): Observable<T> {
    //const options = { headers };
    return this.http.delete<T>(`${this.baseUrl}/${url}/${id}`);
  }
}