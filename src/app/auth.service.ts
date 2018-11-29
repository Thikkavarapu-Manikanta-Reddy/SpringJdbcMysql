import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

signedupstatus = JSON.parse(localStorage.getItem('signedup'+JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits"))) || 'false');

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
  pages(limit:number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/totpage/${limit}`);
  }
  getpeep(limit:number,offset:number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/pages/${limit}/${offset}`);
  }
totpage(limit:number): Observable<any>
{
  return this.http.get(`${this.baseUrl}/count/${limit}`);
}
check(search:string,limit:number): Observable<any>
{
  return this.http.get(`${this.baseUrl}/userdet/${search}/${limit}`);
}
      setsignedup(value:boolean)
      {
        this.signedupstatus = value;
        localStorage.setItem('signedup'+JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits")),'true');
      }
       issignedup()
      {
        //console.log(JSON.parse(localStorage.getItem("pages")),JSON.parse(localStorage.getItem("limits")));
       this.signedupstatus = JSON.parse(localStorage.getItem('signedup'+JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limit"))) || 'false');
       //console.log(localStorage.getItem('signedup'+JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits"))));
               // console.log(this.signedupstatus);
        return JSON.parse(localStorage.getItem('signedup'+JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits"))) || this.signedupstatus.toString());
      }

}
