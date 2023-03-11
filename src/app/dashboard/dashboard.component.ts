import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DailogSoldComponent } from '../dailog-sold/dailog-sold.component';
import { AddProduct } from '../interface/add-product';
import { OrderAdd } from '../interface/order-add';
import { ProductMain } from '../interface/product';
import { UseVoucher } from '../interface/voucher';
import { AuthService } from '../service/auth.service';
import { SoldService } from '../service/sold.service';
import { UiService } from '../service/ui.service';
import { VoucherService } from '../service/voucher.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService, DialogService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private uiService: UiService,
    private authService: AuthService,
    private messageService: MessageService,
    private voucherService: VoucherService,
    private soldService: SoldService,
    private dialogService: DialogService
  ) {}

  ref!: DynamicDialogRef;

  productName: string = '';
  quantity: number = 1;
  price: number = 1;

  onOff: boolean = false;

  prodArr: AddProduct[] = [];

  cartProd: ProductMain[] = [];

  message: string = '';
  messageAdd: string = '';
  updatemsg: string = '';
  updateProdmsg: string = '';

  voucherCode: string = '';

  voucherBtn: string = '';

  sendData: AddProduct = {
    productName: '',
    quantity: 0,
    price: 0,
  };

  ls = JSON.parse(localStorage.getItem('user') || '');

  ngOnInit(): void {
    this.uiService.sendMess(true);

    this.authService.getProd().subscribe((x) => {
      this.prodArr = x;
      console.log(x);
    });

    this.authService.getOrders().subscribe((x) => {
      this.cartProd = x;
      console.log(x);
    });
  }

  plus(nm: string) {
    this.prodArr.map((item) => {
      if (item.productName === nm && item.quantity !== 0) {
        item.quantity--;
        this.cartProd.map((item) =>
          item.productName === nm ? item.quantity++ : item
        );
      }
    });
  }
  subtract(nm: string) {
    this.prodArr.map((item) =>
      item.productName === nm ? item.quantity++ : item
    );

    this.cartProd.map((item) =>
      item.productName === nm ? item.quantity-- : item
    );
  }

  remove(nm: string) {
    const oa: OrderAdd = {
      productName: nm,
    };

    let number = 0;

    this.cartProd.map((item) =>
      item.productName === nm ? (number = item.quantity) : item
    );

    this.prodArr.map((item) =>
      item.productName === nm ? (item.quantity += number) : item
    );

    this.authService.deleteProd(oa).subscribe((x) => {
      this.cartProd = this.cartProd.filter((item) => item.productName !== nm);
    });
  }

  addProduct(data: AddProduct) {
    const oa: OrderAdd = {
      productName: data.productName,
    };

    let check: any = this.prodArr.find(
      (item) => item.productName === data.productName
    );

    if (
      !this.cartProd.some((x) => x.productName === data.productName) &&
      check.quantity > 0
    ) {
      this.authService.addOrder(oa).subscribe((x) => {
        this.cartProd.push(x);
        this.prodArr.map((item) =>
          item.productName === data.productName ? item.quantity-- : item
        );
      });
    } else {
      if (check.quantity <= 0) {
        this.message = 'პროდუქტის რაოდენობა არ არის';
      } else {
        this.message = 'პროდუქტი უკვე დამატებულია';
      }

      setTimeout(() => {
        this.message = '';
      }, 2000);
    }
  }

  onSubmit() {
    const data: AddProduct = {
      productName: this.productName,
      quantity: this.quantity,
      price: this.price,
    };
    if (!this.productName.trim() || this.quantity <= 0 || this.price <= 0) {
      this.messageAdd = 'შეავსეთ ყველა ველი';
      setTimeout(() => {
        this.messageAdd = '';
      }, 2000);
      return;
    }

    if (
      !this.prodArr.some(
        (x) => x.productName.toLowerCase() === data.productName.toLowerCase()
      )
    ) {
      this.authService.addProduct(data).subscribe((x) => {
        this.prodArr.push(x);
      });

      this.productName = '';
      this.quantity = 1;
      this.price = 1;
    } else {
      this.messageAdd = 'პროდუქტი უკვე დამატებულია';
      setTimeout(() => {
        this.messageAdd = '';
      }, 2000);
    }
  }

  deleteProduct(data: string, id?: number) {
    console.log(id);
    this.authService.deleteProduct(data).subscribe((x) => {
      x
        ? (this.prodArr = this.prodArr.filter((x) => x.id !== id))
        : this.prodArr;
    });
  }

  updateSave() {
    this.authService.updateSave(this.cartProd).subscribe(() => {
      this.updatemsg = 'განახლებულია';
    });

    setTimeout(() => {
      this.updatemsg = '';
    }, 2000);
  }

  producteUpdate(data: AddProduct) {
    this.onOff = true;

    this.sendData.productName = data.productName;
    this.sendData.price = data.price;
    this.sendData.quantity = data.quantity;
    this.sendData.authId = data.authId;
    this.sendData.id = data.id;
  }

  onUpdate() {
    const prod = this.prodArr.find((item) => item.id === this.sendData.id);

    prod!.price = this.sendData.price;
    prod!.quantity = this.sendData.quantity;

    const data: AddProduct = { ...this.sendData };

    if (data.quantity <= 0 || data.price <= 0 || !data.productName.trim()) {
      this.updateProdmsg = 'შეავსეთ ყველა ველი';
      setTimeout(() => {
        this.updateProdmsg = '';
      }, 2000);
    } else {
      this.authService.updateProd(data).subscribe((x) => {
        if (x !== false) {
          prod!.productName = this.sendData.productName;
          prod!.price = this.sendData.price;
          prod!.quantity = this.sendData.quantity;
          this.onOff = false;
        } else {
          this.updateProdmsg = 'პროდუქტი უკვე არსებობს';
          setTimeout(() => {
            this.updateProdmsg = '';
          }, 2000);
        }
      });
    }
  }

  onVoucher(data: string) {
    this.voucherBtn = data;
  }

  cancelVoucher() {
    this.voucherBtn = '';
    this.voucherCode = '';
  }

  useVoucher(itemId: number) {
    if (this.voucherCode.length < 16) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'არასწორია ვაუჩერის კოდი',
      });
    } else {
      const data: UseVoucher = {
        voucherCode: this.voucherCode,
        orderId: itemId,
      };

      this.voucherService.useVoucher(data).subscribe((x) => {
        if (x === false) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'არასწორია ვაუჩერის კოდი',
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'ვაუჩერი დამატებულია',
          });
          this.cartProd.map((item) =>
            item.id === itemId ? (item.price = x.price) : item
          );
          this.voucherCode = '';
          this.voucherBtn = '';
        }
      });
    }
  }

  onBuy() {
    this.soldService.buyProduct().subscribe((x) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'პროდუქტი შეძენილია',
      });
      this.cartProd = [];
    });
  }

  show() {
    this.ref = this.dialogService.open(DailogSoldComponent, {
      header: 'Sold Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe(() => {
      this.authService.getProd().subscribe((x) => (this.prodArr = x));
    });

    this.ref.onMaximize.subscribe((value: any) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
