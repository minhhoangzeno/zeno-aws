import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../../../interface/Account.interface";
import { RootState } from "../../store";

const initialState: IAccount[] = [];

export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    AddAccount: (state, action: PayloadAction<IAccount>) => {
      const { password, ...obj } = action.payload;
      state.push(obj);
      return state;
    },
    SetAccount: (state, action: PayloadAction<IAccount[]>) => {
      state = action.payload;
      return state;
    },
    UpdateAccount: (state, action: PayloadAction<IAccount>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      const { password, ...obj } = action.payload;
      if (index > -1) {
        state[index] = {
          ...state[index],
          ...obj,
        };
        return state;
      }
    },
    DeleteAccount: (state, action: PayloadAction<IAccount>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.slice(index, 1);
      }
      return state;
    },
  },
});
export const { SetAccount, UpdateAccount, DeleteAccount, AddAccount } =
  AccountSlice.actions;
export const GetAccount = (state: RootState) => state.account;
export default AccountSlice.reducer;
