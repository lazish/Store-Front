import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoldService {

  private soldUrl = "https://localhost:7104/api/SoldProducts";

  private soldDelUrl = "https://localhost:7104/api/SoldProducts?id="

  private soldUserUrl = "https://localhost:7104/api/SoldProducts/user"

  private soldUserDelUrl = "https://localhost:7104/api/SoldProducts/user?id="

  constructor(private http:HttpClient) { }

  getSoldProduct():Observable<any> {
    return this.http.get(this.soldUrl);
  }

  delSoldProduct(id:number):Observable<any> {
    return this.http.delete(`${this.soldDelUrl}${id}`)
  }

  buyProduct():Observable<any> {
    return this.http.post(this.soldDelUrl, 'payload');
  }

  getSoldListUser():Observable<any> {
    return this.http.get(this.soldUserUrl)
  }

  delSoldItemUser(id:number):Observable<any> {
    return this.http.delete(`${this.soldUserDelUrl}${id}`)
  }

  
}
