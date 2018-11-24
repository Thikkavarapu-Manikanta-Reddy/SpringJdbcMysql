import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

private baseUrl = 'http://localhost:8080';

  putuser(id:number,email:string,password:string): Observable<any>
  {
  	return this.http.post(`${this.baseUrl}` + `/create`,{id,email,password});
  }
  getusers(): Observable<any>
  {
  	return this.http.get(`${this.baseUrl}` + `/get`);
  }
  deleteuser(id:number): Observable<any>
  {
  	return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
  updatuser(oldid:number,id:number,email:string,password:string): Observable<any>
  {
  	return this.http.put(`${this.baseUrl}/update/${oldid}`,{id,email,password});
  }

}
