/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createContract, getContractsList, getContractsListForSelect } from 'redux/actions/mes';
import { ContractState, ContractTypes } from 'types/mes/ContractTypes';

const initial: ContractState = {
  contractError: '',
  requestStatus: '',
  contractsList: [],
  contractsListForSelect: [],
  selectedContractType: ContractTypes.oneTime,
};

const contractReducer = createSlice({
  name: 'contract',
  initialState: initial,
  reducers: {
    resetContractState: (state) => {
      state.contractError = '';
      state.requestStatus = '';
    },
    resetContractsListForSelect: (state) => {
      state.contractsListForSelect = [];
    },
    changeSelectedContractType: (state, action: PayloadAction<ContractTypes>) => {
      state.selectedContractType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createContract.pending, (state) => {
      state.requestStatus = 'pending';
      state.contractError = '';
    });
    builder.addCase(createContract.fulfilled, (state, action) => {
      state.contractsList = [...state.contractsList, action.payload].sort((a, b) => (
        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()));
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(createContract.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.contractError = action.payload?.message || 'Ошибка создания договора';
    });

    builder.addCase(getContractsListForSelect.pending, (state) => {
      state.requestStatus = 'pending';
      state.contractError = '';
      state.contractsListForSelect = [];
    });
    builder.addCase(getContractsListForSelect.fulfilled, (state, action) => {
      state.contractsListForSelect = action.payload.contracts;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(getContractsListForSelect.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.contractError = action.payload?.message || 'Произошла ошибка при загрузке договоров';
      state.contractsListForSelect = [];
    });

    builder.addCase(getContractsList.pending, (state) => {
      state.requestStatus = 'pending';
      state.contractError = '';
    });
    builder.addCase(getContractsList.fulfilled, (state, action) => {
      state.contractsList = action.payload.contractsList;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(getContractsList.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.contractError = action.payload?.message || 'Произошла ошибка при загрузке договоров';
    });
  },
});

export const {
  changeSelectedContractType,
  resetContractState,
  resetContractsListForSelect,
} = contractReducer.actions;

export default contractReducer.reducer;
