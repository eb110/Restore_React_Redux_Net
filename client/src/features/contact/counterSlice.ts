import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/configureStore";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YAK',
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        increment: (state: CounterState, action: PayloadAction<number>) => {
            state.data += action.payload;
        },
        decrement: (state: CounterState, action: PayloadAction<number>) => {
            state.data -= action.payload;
        }
    }
})

export const {increment, decrement} = counterSlice.actions;

export const getCounterSelector = (state: RootState): CounterState => state.counter;

export default counterSlice.reducer;