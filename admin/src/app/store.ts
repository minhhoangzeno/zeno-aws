import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import FileReducer from "./reducers/File/File.reducer";
import LoadingReducer from "./reducers/Loading/Loading.reducer";



export const store = configureStore({
    reducer: {
        file: FileReducer,
        loading: LoadingReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
