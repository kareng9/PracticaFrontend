export interface OrderProduct{
    productId: string,
    product: string,
    imageUrl: string,
    price: number,
    stock: number,
    stockArray?: number[],
    productQuantity: number,
    total: number
}