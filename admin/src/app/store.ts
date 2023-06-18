import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import AccountReducer from "./reducers/Account/Account.reducer";
import AuthReducer from "./reducers/Auth/Auth.reducer";
import DurationTimeReducer from "./reducers/DurationTime/DurationTime.reducer";
import LoadingReducer from "./reducers/Loading/Loading.reducer";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    loading: LoadingReducer,
    account: AccountReducer,
    durationTime: DurationTimeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
