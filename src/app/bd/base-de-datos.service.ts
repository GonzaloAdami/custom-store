import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {

  private apiUrl = 'https://tudbapi.com/api'; 

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl + '/datos');
  }

  postData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/datos', data);
  }
}
