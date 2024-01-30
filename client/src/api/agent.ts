import axios, { AxiosError, AxiosResponse } from "axios";
import { Basket, MetaData, PaginatedResponse, Product, ProductFilters, Products, errorResponse } from "../app/models/types";
import { toast } from "react-toastify";
import { router } from "../app/router/Routes";

axios.defaults.baseURL = `http://localhost:5000/api/`;
axios.defaults.withCredentials=true;

const responseBody = <T>(response: AxiosResponse<T>): any => response.data;

const sleep = (): Promise<object> =>
  new Promise((resolve) => setTimeout(resolve, 500));

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    const pagination = response.headers['pagination'] as string;
    if(pagination){
      response.data = new PaginatedResponse(response.data, JSON.parse(pagination) as MetaData);
     // console.log('axios interceptor pagination: ', response);
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const errorResponse = error.response as errorResponse;

    switch (errorResponse.status) {
      case 400:
        toast.error(errorResponse.data.title);
        break;
      case 401:
        toast.error(errorResponse.data.title);
        break;
      case 500:
        void router.navigate("/server-error", {
          state: { error: errorResponse.data },
        });
        break;
      case 404:
        void router.navigate("/not-found");
        break;
      default:
        break;
    }
    //despite the error, the response still have to be sent back
    //as we wre in a promise
    return Promise.reject(error.response);
  }
);

const requests = {
  get: <T>(url: string, params?: URLSearchParams): Promise<object> =>
    axios.get<T>(url, {params}).then(responseBody) as Promise<object>,
  post: (url: string, body: object): Promise<object> =>
    axios.post(url, body).then(responseBody) as Promise<object>,
  put: (url: string, body: object): Promise<object> =>
    axios.put(url, body).then(responseBody) as Promise<object>,
  delete: (url: string): Promise<void> =>
    axios.delete(url).then(responseBody) as Promise<void>,
};

const Catalog = {
  list: (params: URLSearchParams): Promise<PaginatedResponse<Product>> => 
    requests.get("products", params) as Promise<PaginatedResponse<Product>>,
  details: (id: number): Promise<Product> =>
    requests.get(`products/${id}`) as Promise<Product>,
  filters: (): Promise<ProductFilters> => requests.get("products/filters") as Promise<ProductFilters>,
};

const TestErrors = {
  get404Error: (): Promise<object> => requests.get("buggy/not-found"),
  get400Error: (): Promise<object> => requests.get("buggy/bad-request"),
  get401Error: (): Promise<object> => requests.get("buggy/authorisation-error"),
  getValidationError: (): Promise<object> =>
    requests.get("buggy/validation-error"),
  get500Error: (): Promise<object> => requests.get("buggy/server-error"),
};

const Basket = {
  basket: (): Promise<Basket> => requests.get("basket") as Promise<Basket>,
  addItem: (productId: number, quantity = 1): Promise<Basket> =>
    requests.post(
      `basket?productId=${productId}&quantity=${quantity}`,
      {}
    ) as Promise<Basket>,
  removeItem: (productId: number, quantity = 1): Promise<void> =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
};

export default agent;
