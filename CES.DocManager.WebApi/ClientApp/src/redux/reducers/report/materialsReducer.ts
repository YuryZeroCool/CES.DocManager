import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentGroupAccountResponse, IMaterialsResponse } from '../../../types/ReportTypes';
import getAllGroupAccounts from '../../actions/report/materialReport/getAllGroupAccounts';
import getAllMaterials from '../../actions/report/materialReport/getAllMaterials';

const initial: IMaterialsResponse = {
  getAllMaterials: [],
  getAllGroupAccounts: [],
  currentGroupAccount: '',
  status: '',
};

const materialsReducer = createSlice({
  name: 'materials',
  initialState: initial,
  reducers: {
    changeCurrentGroupAccount: (state, action: PayloadAction<CurrentGroupAccountResponse>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = { ...stateCopy, currentGroupAccount: action.payload };
      return stateCopy;
    },
    resetAllMaterials: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = { ...stateCopy, getAllMaterials: [] };
      return stateCopy;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMaterials.pending, (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, status: 'pending' };
      return stateCopy;
    });
    builder.addCase(getAllMaterials.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, getAllMaterials: [...action.payload], status: 'fulfilled' };
      return stateCopy;
    });
    builder.addCase(getAllMaterials.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getAllGroupAccounts.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, getAllGroupAccounts: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getAllGroupAccounts.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const { changeCurrentGroupAccount, resetAllMaterials } = materialsReducer.actions;
export default materialsReducer.reducer;
