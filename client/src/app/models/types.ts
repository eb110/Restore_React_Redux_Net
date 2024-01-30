export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
}
export type Products = Product[];

export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    types: string[],
    brands: string[],
    pageNumber: number,
    pageSize: number,
}

export interface Basket {
  id: number;
  buyerId: string;
  items: BasketItem[];
}

export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantity: number;
}

export interface ProductFilters {
    brands: string[],
    types: string[],
}

export interface RoutePath {
  title: string;
  path: string;
}

export type RoutePaths = RoutePath[];

export interface errorResponse {
  data: errorData;
  status: number;
}

export interface errorData {
  title: string;
  detail: string;
  status: number;
}

export interface locationError {
  error: errorData;
}

export interface LoadingButtonState {
  state: boolean;
  id: number;
  type: string;
}

export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

//product
export class PaginatedResponse<T> {
  //product array
  items: T;
  metaData: MetaData;

  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
