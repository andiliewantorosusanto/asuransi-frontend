import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

const baseUrl = environment.apiUrl+'/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }
  update(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/update`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/changePassword`, data);
  }
}
