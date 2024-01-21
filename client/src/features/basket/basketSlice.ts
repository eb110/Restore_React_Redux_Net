import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket, errorResponse } from "../../app/models/types";
import { RootState } from "../../app/store/configureStore";
import agent from "../../api/agent";

interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle',
};

//<what the async call return, parameters>
export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
    'basket/addBasketItemAsync',
    async({productId, quantity = 1}, thunkApi): Promise<any> => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error) {
            const errorResult = error as errorResponse;
            return thunkApi.rejectWithValue({error: errorResult.data});
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity: number, type?: string}>(
    'basket/removeBasketItemAsync',
    async({productId, quantity}, thunkApi): Promise<any> => {
        try {
            await agent.Basket.removeItem(productId, quantity);
        } catch (error) {
            const errorResult = error as errorResponse;
            return thunkApi.rejectWithValue({error: errorResult.data});
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state: BasketState, action: PayloadAction<Basket>) => {
            state.basket = action.payload;
        },
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = `pendingAddItem ${action.meta.arg.productId}`;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log('add item to basket action error: ', action.payload)
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = `pendingRemoveItem ${action.meta.arg.productId}${action.meta.arg.type ?? ''}`;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
            if (!state.basket) return;
            const items = state.basket.items;
            const index = items.findIndex((item) => item.productId === productId);
            if (index === -1) return;
            if (items[index].quantity === quantity) items.splice(index, 1);
            else items[index].quantity -= quantity;
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log('remove item to basket action error: ', action.payload)
        });
    })
})

//set basket can be used by the project as non async call and this is why it exist as
//a simple reduce function and the async one as well
export const {setBasket} = basketSlice.actions;

export const getBasketSelector = (state: RootState): BasketState => state.basket;

export default basketSlice.reducer;