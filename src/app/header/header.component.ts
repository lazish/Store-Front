import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../service/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  onOff: boolean = false;


  subscription: Subscription;;


  constructor(private router: Router, private uiService:UiService) {
    this.subscription = this.uiService.onGet().subscribe(x => this.onOff = x)
  }

  ngOnInit(): void {

  }

  clearLoc() {
    this.uiService.sendMess(false)
    this.onOff = false;
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }

  

}
