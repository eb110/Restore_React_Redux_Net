import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MetaData, PaginatedResponse, Product, ProductFilters, ProductParams, Products, errorResponse } from "../../app/models/types";
import agent from "../../api/agent";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    brands: string[];
    types: string[];
    status: string;
    productParams: ProductParams;
    metaData: MetaData | null;
}

const initParams: ProductParams = {
    orderBy: 'name',
    pageNumber: 1,
    pageSize: 6,
    types: [],
    brands: [],
}

const initialState: CatalogState = {
    productsLoaded: false,
    filtersLoaded: false,
    brands: [] as string[],
    types: [] as string[],
    status: 'idle',
    productParams: initParams,
    metaData: null,
}

const productsAdapter = createEntityAdapter<Product>();

const getAxiosParams = (productParams: ProductParams): URLSearchParams => {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);

    if(productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if(productParams.brands.length > 0) params.append('brands', productParams.brands.join(','));
    if(productParams.types.length > 0) params.append('types', productParams.types.join(','));

    return params;
}

export const fetchProductsAsync = createAsyncThunk<Products, void, {state: RootState}>(
   'catalog/fetchProductsAsync',
   async(_, thunkApi): Promise<any> => {
    //params is the object of the qurent query parameters state
    //it is created every time we are fetching the list of the products
    //params is a property of request - the backend performs metadata update
    //and query to db based on these parameters
    const params = getAxiosParams(thunkApi.getState().catalog.productParams);
    try {
        const response = await agent.Catalog.list(params);
        thunkApi.dispatch(setMetaData(response.metaData));
        return response.items;
    } catch (error) {
        const errorResult = error as errorResponse;
        return thunkApi.rejectWithValue({error: errorResult.data});
    }
   } 
)

export const fetchProductFiltersAsync = createAsyncThunk<ProductFilters>(
    'catalog/fetchProductFiltersAsync',
    async(_, thunkApi): Promise<any> => {
     try {
         return await agent.Catalog.filters();
     } catch (error) {
         const errorResult = error as errorResponse;
         return thunkApi.rejectWithValue({error: errorResult.data});
     }
    } 
 )

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async(productId:number, thunkApi): Promise<any> => {
     try {
         return await agent.Catalog.details(productId)
     } catch (error) {
        const errorResult = error as errorResponse;
         return thunkApi.rejectWithValue({error: errorResult.data});
     }
    } 
 )

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>(initialState),
    reducers: {
        setProductParams: (state: CatalogState, action: PayloadAction<ProductParams>) => {
            //this will trigger refetch of the products due to the change of the useEffect parameter
            //within catalog.tsx
            state.productsLoaded = false;
            state.productParams = action.payload;
            state.productParams.pageNumber = 1;
        },
        setPageNumber: (state: CatalogState, action: PayloadAction<ProductParams>) => {
            state.productsLoaded = false;
            state.productParams = action.payload;
        },
        resetProgramParams: (state: CatalogState) => {
            state.productParams = initParams;
        },
        setMetaData: (state: CatalogState, action: PayloadAction<MetaData>) => {
            state.metaData = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload)
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log('get products list action error: ', action.payload)
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload)
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log('get single product rejected action: ', action.payload)
        });
        builder.addCase(fetchProductFiltersAsync.pending, (state) => {
            state.status = 'pendingFetchProductFilters';
        });
        builder.addCase(fetchProductFiltersAsync.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.status = 'idle';
            state.filtersLoaded = true;
        });
        builder.addCase(fetchProductFiltersAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log('get product filters rejected action: ', action.payload)
        });
    })
});

export const {setProductParams, resetProgramParams, setMetaData, setPageNumber} = catalogSlice.actions;

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);

export default catalogSlice.reducer;