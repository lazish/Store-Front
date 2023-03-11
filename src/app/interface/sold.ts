export interface Sold {
    id: number,
    quantity: number,
    price: number,
    productName: string,
    authName: string
    dateTime:Date
}
export interface SoldUserList {
    id: number,
    quantity: number,
    price: number,
    productName: string,
    dateTime:Date
}

export interface SoldReport {
    productName: string,
    totalSales: number,
    quantity: number
}