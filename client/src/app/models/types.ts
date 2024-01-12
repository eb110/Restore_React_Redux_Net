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

export interface RoutePath{
    title: string;
    path: string;
}

export type RoutePaths = RoutePath[]