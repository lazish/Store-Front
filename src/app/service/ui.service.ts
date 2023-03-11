import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private onOff: boolean = false;

  private subject = new Subject<any>();

  sendMess(bool: boolean) {
  
    const ls = JSON.parse(localStorage.getItem('user') || '')

    ls ? this.subject.next(this.onOff = bool) : this.subject.next(this.onOff = bool)
  }

  onGet():Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
}
