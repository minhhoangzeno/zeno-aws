import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../../../interface/File.interface";
import { RootState } from "../../store";

const initialState: IFile[] = [];

export const FileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    SetFile: (state, action: PayloadAction<IFile[]>) => {
      state = [];
      state = action.payload;
      return state;
    },
    AddFile: (state, action: PayloadAction<IFile>) => {
      const index = state.findIndex((el) => el.name === action.payload.name);
      if (index === -1) {
        state.push(action.payload);
        return state;
      }
    },
    DeleteFile: (state, action: PayloadAction<IFile>) => {
      const index = state.findIndex(
        (el) => el.transactionID === action.payload.transactionID
      );
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
  },
});
export const { SetFile, AddFile, DeleteFile } = FileSlice.actions;
export const GetFile = (state: RootState) => state.file;
export default FileSlice.reducer;
