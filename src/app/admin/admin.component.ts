import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { AddProduct, User } from '../interface/add-product';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  providers: [MessageService],
  styles: [
    `
      :host ::ng-deep .p-cell-editing {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    `,
  ],
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  products1!: AddProduct[];

  products2!: AddProduct[];

  usersArr: User[] = [];
  selectedUser!: User;

  statuses!: SelectItem[];

  addObj: AddProduct = {
    productName: '',
    quantity: 0,
    price: 0,
  };

  clonedProducts: { [s: string]: AddProduct } = {};

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProd().subscribe((x) => (this.products1 = x));
    this.authService.getProd().subscribe((x) => (this.products2 = x));
    this.authService.getUsers().subscribe((x) => {
      this.usersArr = x;
    });

    this.statuses = [
      { label:''+ 10, value: 10 },
      { label: ''+10, value: 20 },
      { label: ''+10, value: 30 },
    ];
  }

  onRowEditInit(product: AddProduct) {
    this.clonedProducts[product.id!] = { ...product };
  }

  onRowEditSave(product: AddProduct) {
    const arr = this.products1.filter((item) => item.id !== product.id);

    if (
      product.price > 0 &&
      !arr.some((item) => item.productName === product.productName)
    ) {
      delete this.clonedProducts[product.id!];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product is updated',
      });
      this.authService.updateProd(product).subscribe();
    } else {
      this.products2 = this.products1;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid',
      });
    }
  }

  onRowEditCancel(product: AddProduct, index: number) {
    this.products2[index] = this.clonedProducts[product.id!];
    delete this.products2[product.id!];
  }

  deleteProd(data: AddProduct) {
    this.authService
      .deleteProduct(data.productName)
      .subscribe(
        (x) =>
          (this.products2 = this.products2.filter(
            (item) => item.id !== data.id
          ))
      );
  }

  addProduct() {
    if (
      this.addObj.productName.trim() &&
      this.addObj.price > 0 &&
      this.addObj.quantity > 0
    ) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'პროდუქტუ დამატებულია',
      });
      this.authService
        .addProduct(this.addObj)
        .subscribe((x) => this.products2.push(x));
      this.addObj.productName = '';
      this.addObj.price = 0;
      this.addObj.quantity = 0;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'შეავსეთ ყველა ველი',
      });
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }

  onChange() {
    if (this.selectedUser !== null) {
      this.products2 = this.products2.filter(
        (x) => x.authId === this.selectedUser.code
      );
    } else {
      this.products2 = this.products1;
    }
  }

  goBack() {
    this.route.navigate(['/voucher']);
  }
  soldList() {
    this.route.navigate(['/sold']);
  }
  report() {
    this.route.navigate(['/chart']);
  }
}
