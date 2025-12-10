/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ActDataFromFileResponse,
  INotesState,
  UpdateActDataFromFileReq,
} from 'types/MesTypes';
import getActTypesFromFile from 'redux/actions/mes/getActTypesFromFile';
import getActDataFromFile from 'redux/actions/mes/getActDataFromFile';
import createNewAct from 'redux/actions/mes/createNewAct';
import getActsList from 'redux/actions/mes/getActsList';
import deleteAct from 'redux/actions/mes/deleteAct';

const actDataFromFileDefault: ActDataFromFileResponse = {
  actType: '',
  season: '',
  act: [],
};

const initial: INotesState = {
  mesError: '',
  requestStatus: '',
  mesPageType: localStorage.getItem('mesPageType') || 'Заявки',
  actTypesFromFile: [],
  actDataFromFile: actDataFromFileDefault,
  deletedNoteId: 0,
  totalActSumm: '0',
  vat: '0',
  createdActId: 0,
  actsList: [],
  totalActsListCount: 0,
  selectedActId: 0,
  deletedActId: 0,
};

const mesReducer = createSlice({
  name: 'mes',
  initialState: initial,
  reducers: {
    changeMesPageType: (state, action: PayloadAction<string>) => {
      state.mesPageType = action.payload;
    },
    resetTotalActSummVat: (state) => {
      state.totalActSumm = '0';
      state.vat = '0';
    },
    changeSelectedActId: (state, action: PayloadAction<number>) => {
      state.selectedActId = action.payload;
    },
    updateActTotalSumm: (state, action: PayloadAction<string>) => {
      const totalSumm = state.actDataFromFile.act.reduce((sum, act) => sum + act.works
        .reduce((workSum, work) => workSum + (work.totalSumm || 0), 0), 0);

      const roundedTotalSumm = Math.round(totalSumm * 100) / 100;

      const vat = action.payload !== 'Для жилых помещений'
        ? Math.round((roundedTotalSumm / 6) * 100) / 100
        : 0;

      state.totalActSumm = roundedTotalSumm.toFixed(2);
      state.vat = vat.toFixed(2);
    },
    changeActTotalSumm: (state, action: PayloadAction<{ type: string, value: string }>) => {
      if (action.payload.value === '') {
        state.totalActSumm = '';
        state.vat = '';
        return;
      }

      const numericRegex = /^[0-9]*([.,][0-9]*)?$/;
      if (!numericRegex.test(action.payload.value)) {
        return;
      }

      const normalizedValue = action.payload.value.replace(',', '.');
      const parsedValue = parseFloat(normalizedValue);

      let vat = '';
      if (!Number.isNaN(parsedValue) && parsedValue >= 0) {
        if (action.payload.type !== 'Для жилых помещений') {
          const calculatedVat = Math.round((parsedValue / 6) * 100) / 100;
          vat = calculatedVat.toFixed(2);
        } else {
          vat = '0';
        }
      }

      state.totalActSumm = action.payload.value;
      state.vat = vat;
    },
    changeVat: (state, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.vat = '';
        return;
      }

      const regexp = /^[0-9]{0,}([,.0-9]{0,3})?$/g;

      if (action.payload.match(regexp)) {
        state.vat = action.payload;
      }
    },
    updateActDataFromFile: (state, action: PayloadAction<UpdateActDataFromFileReq>) => {
      const { actDataFromFile } = state;
      const { type, workName, value } = action.payload;

      const actIndex = actDataFromFile.act.findIndex((el) => el.type === type);

      if (actIndex !== -1) {
        const workIndex = actDataFromFile.act[actIndex]
          .works.findIndex((work) => work.name === workName);

        if (workIndex !== -1) {
          const currentWork = actDataFromFile.act[actIndex].works[workIndex];
          const regexp = /^[0-9]{0,}([,.0-9]{0,3})?$/g;

          if (value.match(regexp)) {
            currentWork.count = value;
          }

          if (value !== '') {
            currentWork.totalSumm = Math.round(currentWork.price * parseFloat(value.replace(',', '.')) * 100) / 100;
          } else {
            currentWork.totalSumm = 0;
          }
        }
      }
    },
    resetActData: (state, action: PayloadAction<string>) => {
      const { actDataFromFile } = state;
      const actIndex = actDataFromFile.act.findIndex((el) => el.type === action.payload);

      if (actIndex !== -1) {
        actDataFromFile.act[actIndex].works = actDataFromFile.act[actIndex].works.map((el) => (
          {
            ...el,
            count: '0',
            totalSumm: 0,
          }
        ));
      }
      state.totalActSumm = '0';
      state.vat = '0';
    },
    editActsListAfterDelete: (state, action: PayloadAction<number>) => {
      state.actsList = state.actsList.filter((el) => el.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActTypesFromFile.fulfilled, (state, action) => {
      state.actTypesFromFile = action.payload;
    });
    builder.addCase(getActTypesFromFile.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getActDataFromFile.fulfilled, (state, action) => {
      state.actDataFromFile = action.payload;
    });
    builder.addCase(getActDataFromFile.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(createNewAct.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(createNewAct.fulfilled, (state, action) => {
      state.createdActId = action.payload;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(createNewAct.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getActsList.pending, (state) => {
      state.requestStatus = 'pending';
      state.mesError = '';
    });
    builder.addCase(getActsList.fulfilled, (state, action) => {
      state.actsList = action.payload.actsList;
      state.totalActsListCount = action.payload.totalActsListPagesCount;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(getActsList.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.mesError = action.payload?.message || 'Произошла ошибка при загрузке актов';
      state.actsList = [];
      state.totalActsListCount = 0;
    });

    builder.addCase(deleteAct.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(deleteAct.fulfilled, (state, action) => {
      state.deletedActId = action.payload;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(deleteAct.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const {
  changeSelectedActId,
  changeMesPageType,
  updateActDataFromFile,
  resetTotalActSummVat,
  updateActTotalSumm,
  changeActTotalSumm,
  changeVat,
  resetActData,
  editActsListAfterDelete,
} = mesReducer.actions;

export default mesReducer.reducer;
