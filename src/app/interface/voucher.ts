export interface Voucher {
  price: number;
  expireDate:Date
}
export interface GetVoucher {
  id: number;
  voucherCode: string;
  price: number;
  used: boolean;
  authId: number;
  expireDate:Date 
}

export interface UseVoucher {
  voucherCode: string;
  orderId: number;
}
