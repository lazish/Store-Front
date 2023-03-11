export interface AddProduct {
  id?:number,
  productName: string;
  quantity: number;
  price: number;
  authId?: number;

}
export interface User {
  name: string,
  code: number
}
