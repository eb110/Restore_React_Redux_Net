//ACTION TYPES

import { Action } from "redux";

//RETURNED by dispatch object
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 42,
  title: "YAK",
};

export function increment(amount = 1): any{
    return {
        type: INCREMENT_COUNTER,
        payload: amount,
    }
}

export function decrement(amount = 1): any{
    return {
        type: DECREMENT_COUNTER,
        payload: amount,
    }
}

export interface CounterActionType{
    type: string;
    payload: number;
}

//action type is sent back from the app features
//the reducer performs action and updates the state
//as features uses 'useSelector' the refresh process takes a place and data is updated
export default function counterReducer(state = initialState, action: CounterActionType): CounterState {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - action.payload,
      };
    default:
      return state;
  }
}
