import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITeam } from '../../../interface/Team.interface';
import { RootState } from '../../store';

const initialState: ITeam[] = [];

export const TeamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    AddTeam: (state, action: PayloadAction<ITeam>) => {
      state.push(action.payload);
      return state;
    },
    UpdateTeam: (state, action: PayloadAction<ITeam>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          name: action.payload.name,
          leaderId: action.payload.leaderId,
          leader: action.payload.leader,
          members: action.payload.members,
        };
        return state;
      }
    },
    PutTeam: (state, action: PayloadAction<ITeam>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          name: action.payload.name,
          leaderId: action.payload.leaderId,
          leader: action.payload.leader,
          members: action.payload.members,
        };
        return state;
      } else {
        state.push(action.payload);
        return state;
      }
    },
    DeleteTeam: (state, action: PayloadAction<ITeam>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetTeam: (state, action: PayloadAction<ITeam[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { AddTeam, UpdateTeam, DeleteTeam, PutTeam, SetTeam } = TeamSlice.actions;

export const GetTeam = (state: RootState) => state.team;
export default TeamSlice.reducer;
