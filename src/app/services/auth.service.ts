import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const AUTH_API = environment.apiUrl+'/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(data : any): Observable<any> {
    return this.http.post(AUTH_API + 'register', data, httpOptions);
  }
}
