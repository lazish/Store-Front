import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportUrl = 'https://localhost:7104/api/Reports';


  private url2 = "https://localhost:7104/api/Reports/date?"

  constructor(private http: HttpClient) {}

  getReport(start:any, end:any): Observable<any> {
    return this.http.get(`${this.url2}start=${start.toDateString()}&end=${end.toDateString()}`);
  }
}
