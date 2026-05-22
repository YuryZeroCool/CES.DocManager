/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createContract,
  getContractsList,
  getContractsListForSelect,
  markContractPrinted,
  updateContract,
} from 'redux/actions/mes';
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
    setContractPrinted: (state, action: PayloadAction<number>) => {
      const contract = state.contractsList.find((item) => item.id === action.payload);
      if (contract) {
        contract.isPrinted = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createContract.pending, (state) => {
      state.requestStatus = 'pending';
      state.contractError = '';
    });
    builder.addCase(createContract.fulfilled, (state) => {
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(createContract.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.contractError = action.payload?.message || 'Ошибка создания договора';
    });

    builder.addCase(updateContract.pending, (state) => {
      state.requestStatus = 'pending';
      state.contractError = '';
    });
    builder.addCase(updateContract.fulfilled, (state, action) => {
      state.requestStatus = 'fulfilled';
      const index = state.contractsList.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        const previous = state.contractsList[index];
        state.contractsList[index] = {
          ...action.payload,
          actsCount: action.payload.actsCount ?? previous.actsCount,
          organization: action.payload.organization ?? previous.organization,
        };
      }
    });
    builder.addCase(updateContract.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.contractError = action.payload?.message || 'Ошибка обновления договора';
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

    builder.addCase(markContractPrinted.fulfilled, (state, action) => {
      const contract = state.contractsList.find((item) => item.id === action.payload);
      if (contract) {
        contract.isPrinted = true;
      }
    });
  },
});

export const {
  changeSelectedContractType,
  resetContractState,
  resetContractsListForSelect,
  setContractPrinted,
} = contractReducer.actions;

export default contractReducer.reducer;
