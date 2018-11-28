import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

private baseUrl = 'http://localhost:8080';

  exisuser(email:string): Observable<any>
  {
  	return this.http.get(`${this.baseUrl}`+`/agents/`+`${email}`);
  }
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
    patuser(search:string): Observable<any>
  {
  	return this.http.get(`${this.baseUrl}/user/${search}`);
  }

	patuser123(): Observable<any>
  {
	return this.http.get(`${this.baseUrl}/user`);
  }
    userdet1(): Observable<any>
  {
    	return this.http.get(`${this.baseUrl}/user1`);
  }
      userdet2(): Observable<any>
  {
    	return this.http.get(`${this.baseUrl}/user2`);
  }
  pages(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/totpage`);
  }
  getpeep(page:number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/pages/${page}`);
  }
totpage(): Observable<any>
{
  return this.http.get(`${this.baseUrl}/count`);
}
check(search:string): Observable<any>
{
  return this.http.get(`${this.baseUrl}/userdet/${search}`);
}

}
