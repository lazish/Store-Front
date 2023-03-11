import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseVoucher, Voucher } from '../interface/voucher';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  private voucherCreatNGeteUrl:string = 'https://localhost:7104/api/Voucher'

  private deleteVoucherUrl:string = 'https://localhost:7104/api/Voucher?voucherCode='
  

  private useVoucherUrl:string = 'https://localhost:7104/api/Voucher/usevoucher'

  constructor(private http: HttpClient) { }


  createVoucher(data:Voucher):Observable<any> {
    return this.http.post(this.voucherCreatNGeteUrl, data)
  }

  getVoucher():Observable<any> {
    return this.http.get(this.voucherCreatNGeteUrl)
  }

  deleteVoucher(data:string):Observable<any> {
    return this.http.delete(`${this.deleteVoucherUrl}${data}`)
  }

  useVoucher(data:UseVoucher):Observable<any> {
    return this.http.post(this.useVoucherUrl, data)
  }
}
