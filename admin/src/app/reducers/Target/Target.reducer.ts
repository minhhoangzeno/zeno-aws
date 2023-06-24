import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState: boolean = false;

export const TargetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    SetTarget: (state, action: PayloadAction<boolean>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { SetTarget } = TargetSlice.actions;

export const GetTarget = (state: RootState) => state.target;
export default TargetSlice.reducer;
