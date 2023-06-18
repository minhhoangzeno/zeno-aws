import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDurationTime } from "../../../interface/DurationTime.interface";
import { RootState } from "../../store";

const initialState: IDurationTime[] = [];

export const DurationTimeSlice = createSlice({
  name: "durationTime",
  initialState,
  reducers: {
    AddDurationTime: (state, action: PayloadAction<IDurationTime>) => {
      state.push(action.payload);
      return state;
    },
    UpdateDurationTime: (state, action: PayloadAction<IDurationTime>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          title: action.payload.title,
        };
        return state;
      }
    },
    DeleteDurationTime: (state, action: PayloadAction<IDurationTime>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetDurationTime: (state, action: PayloadAction<IDurationTime[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const {
  AddDurationTime,
  UpdateDurationTime,
  DeleteDurationTime,
  SetDurationTime,
} = DurationTimeSlice.actions;

export const GetDurationTime = (state: RootState) => state.durationTime;
export default DurationTimeSlice.reducer;
