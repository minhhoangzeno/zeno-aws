import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../../interface/Order.interface";
import { RootState } from "../../store";

const initialState: IOrder[] = [];

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    AddOrder: (state, action: PayloadAction<IOrder>) => {
      state.push(action.payload);
      return state;
    },
    UpdateOrder: (state, action: PayloadAction<IOrder>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          numberOfCall: action.payload.numberOfCall,
          numberOfAdvise: action.payload.numberOfAdvise,
          numberOfOrder: action.payload.numberOfOrder,
          numberOfAccepted: action.payload.numberOfAccepted,
          revenueOfOrder: action.payload.revenueOfOrder,
          revenueOfAccepted: action.payload.revenueOfAccepted,
          durationTimeId: action.payload.durationTimeId,
        };
        return state;
      }
    },
    DeleteOrder: (state, action: PayloadAction<IOrder>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetOrder: (state, action: PayloadAction<IOrder[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { AddOrder, UpdateOrder, DeleteOrder, SetOrder } =
  OrderSlice.actions;

export const GetOrder = (state: RootState) => state.order;
export default OrderSlice.reducer;
