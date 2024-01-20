export interface Product{
    id: number
    name: string
    description: string
    price: number
    pictureUrl: string
    type: string
    brand: string
    quantityInStock: number
}
export type Products = Product[]

export interface Basket {
    id: number
    buyerId: string
    items: BasketItem[]
  }
  
  export interface BasketItem {
    productId: number
    name: string
    price: number
    pictureUrl: string
    type: string
    brand: string
    quantity: number
  }

export interface RoutePath{
    title: string;
    path: string;
}

export type RoutePaths = RoutePath[]

export interface errorResponse{
    data: errorData;
    status: number;
}

export interface errorData{
    title: string;
    detail: string;
    status: number;
}

export interface locationError{
    error: errorData
}

export interface LoadingButtonState{
    state: boolean;
    id: number;
    type: string
}
