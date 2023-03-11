import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authobj } from '../interface/authobj';

import { OrderAdd } from '../interface/order-add';
import { AddProduct } from '../interface/add-product';
import { ProductMain } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlLogin = 'https://localhost:7104/api/auth';
  private urlReg = 'https://localhost:7104/api/Auth/register';

  private getProductUrl = 'https://localhost:7104/api/auth/products';

  private addProductUrl = 'https://localhost:7104/api/auth/product';

  private getORderUrl = 'https://localhost:7104/api/auth/orders';
  private orderDelUrl = 'https://localhost:7104/api/auth/orders?ProductName=';

  private deleteProductUrl =
    'https://localhost:7104/api/auth/products?ProductName=';

  private saveChange = 'https://localhost:7104/api/auth/save';

  private updateProdUrl = 'https://localhost:7104/api/auth/update';

  private getUsersUrl = "https://localhost:7104/api/auth/users"

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  isLogged() {
    const token = JSON.parse(localStorage.getItem('user')!);
    return token;
  }

  reqLogin(data: Authobj): Observable<any> {
    return this.http.post(this.urlLogin, data, { headers: this.httpHeader });
  }

  reqRegister(data: Authobj): Observable<any> {
    return this.http.post(this.urlReg, data, { headers: this.httpHeader });
  }
  update(data: Authobj): Observable<any> {
    return this.http.put(this.urlLogin, data, { headers: this.httpHeader });
  }
  getProd(): Observable<any> {
    return this.http.get(this.getProductUrl);
  }

  getOrders(): Observable<any> {
    return this.http.get(this.getORderUrl);
  }

  addOrder(data: OrderAdd): Observable<any> {
    return this.http.post(this.getORderUrl, data);
  }

  addProduct(data: AddProduct): Observable<any> {
    return this.http.post(this.addProductUrl, data);
  }

  deleteProd(data: OrderAdd): Observable<any> {
    return this.http.delete(`${this.orderDelUrl}${data.productName}`);
  }

  deleteProduct(data: string): Observable<any> {
    return this.http.delete(`${this.deleteProductUrl}${data}`);
  }

  updateSave(data: ProductMain[]): Observable<any> {
    return this.http.patch(this.saveChange, data);
  }

  updateProd(data: AddProduct): Observable<any> {
    return this.http.patch(this.updateProdUrl, data);
  }

  getUsers():Observable<any> {
    return this.http.get(this.getUsersUrl)
  }
}
