/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createContract } from 'redux/actions/mes';
import { ContractState } from 'types/mes/ContractTypes';

const initial: ContractState = {
  contractError: '',
  requestStatus: '',
  createdContractId: null,
};

const contractReducer = createSlice({
  name: 'contract',
  initialState: initial,
  reducers: {
    resetContractState: (state) => {
      state.contractError = '';
      state.requestStatus = '';
      state.createdContractId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createContract.pending, (state) => {
      state.requestStatus = 'pending';
      state.contractError = '';
      state.createdContractId = null;
    });
    builder.addCase(createContract.fulfilled, (state, action) => {
      state.createdContractId = action.payload.id;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(createContract.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.contractError = action.payload?.message || 'Ошибка создания договора';
      state.createdContractId = null;
    });
  },
});

export const { resetContractState } = contractReducer.actions;

export default contractReducer.reducer;
