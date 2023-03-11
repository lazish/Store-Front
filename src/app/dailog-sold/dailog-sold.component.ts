import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SoldUserList } from '../interface/sold';
import { SoldService } from '../service/sold.service';

@Component({
  selector: 'app-dailog-sold',
  templateUrl: './dailog-sold.component.html',
  styleUrls: ['./dailog-sold.component.css'],
})
export class DailogSoldComponent implements OnInit {
  products: SoldUserList[] = [];

  constructor(
    private soldService: SoldService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.soldService.getSoldListUser().subscribe((x) => (this.products = x));
  }

  selectProduct(product: SoldUserList) {
    this.ref.close(product);
  }

  deleteSold(id: number) {
    this.soldService.delSoldItemUser(id).subscribe((x) => {
      this.products = this.products.filter((x) => x.id !== id);
    });
  }
}
