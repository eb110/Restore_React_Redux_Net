import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, Products, errorResponse } from "../../app/models/types";
import agent from "../../api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Products>(
   'catalog/fetchProductsAsync',
   async(_, thunkApi): Promise<any> => {
    try {
        return await agent.Catalog.list();
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
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
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
            console.log('get single product pending')
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload)
            state.status = 'idle';
            console.log('get single product fulfilled')
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log('get single product rejected action: ', action)
        });
    })
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);