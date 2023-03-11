import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sold } from '../interface/sold';
import { SoldService } from '../service/sold.service';





@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css'],
})
export class SoldComponent implements OnInit {
  soldArr: Sold[] = [];

  searchText: string = '';



  constructor(private soldService: SoldService, private router: Router) {}

  ngOnInit(): void {
    this.soldService.getSoldProduct().subscribe((x) => {
      this.soldArr = x;
      console.log(x);
    });
  }


  goBack() {
    this.router.navigate(['/admin']);
  }
  

  onDelSoldProduct(id: number) {
    return this.soldService
      .delSoldProduct(id)
      .subscribe(
        (x) => (this.soldArr = this.soldArr.filter((item) => item.id !== x.id))
      );
  }
}
