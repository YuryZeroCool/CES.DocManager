import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ActDataFromFileResponse,
  INotesState,
  ISearchOrganization,
  OrganizationResponse,
  UpdateActDataFromFileReq,
} from '../../../types/MesTypes';
import getAllNotes from '../../actions/mes/getAllNotes';
import getAllFullNoteData from '../../actions/mes/getAllFullNoteData';
import editExistedNote from '../../actions/mes/editExistedNote';
import createOrganization from '../../actions/mes/createOrganization';
import deleteOrganization from '../../actions/mes/deleteOrganization';
import editOrganization from '../../actions/mes/editOrganization';
import searchOrganizations from '../../actions/mes/searchOrganizations';
import getNotesWithoutActs from '../../actions/mes/getNotesWithoutActs';
import getActTypesFromFile from '../../actions/mes/getActTypesFromFile';
import getActDataFromFile from '../../actions/mes/getActDataFromFile';
import deleteNote from '../../actions/mes/deleteNote';
import organizationsBySearch from '../../actions/mes/organizationsBySearch';
import streetsBySearch from '../../actions/mes/getStreetsBySearch';
import createNewAct from '../../actions/mes/createNewAct';
import getActsList from '../../actions/mes/getActsList';
import deleteAct from '../../actions/mes/deleteAct';

const organizationDefault = {
  id: 0,
  name: '',
  payerAccountNumber: '',
  address: '',
  email: '',
  phone: '',
};

const searchOrganizationsDefault: ISearchOrganization = {
  totalPage: 1,
  organizations: [],
};

const actDataFromFileDefault: ActDataFromFileResponse = {
  actType: '',
  season: '',
  act: [],
};

const initial: INotesState = {
  allNotes: [],
  allFullNoteData: [],
  editedNoteId: 0,
  selectedNoteId: 0,
  requestStatus: '',
  createdOrganization: organizationDefault,
  allOrganizations: searchOrganizationsDefault,
  allOrganizationsBySearch: [],
  selectedOrganizationId: 0,
  editedOrganization: organizationDefault,
  deletedOrganizationId: 0,
  mesPageType: localStorage.getItem('mesPageType') || 'Заявки',
  notesWithoutAct: [],
  actTypesFromFile: [],
  actDataFromFile: actDataFromFileDefault,
  deletedNoteId: 0,
  totalActSumm: 0,
  vat: 0,
  streetsBySearch: [],
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
      let stateCopy: INotesState = state;
      stateCopy = { ...stateCopy, mesPageType: action.payload };
      return stateCopy;
    },
    resetTotalActSummVat: (state) => {
      let stateCopy: INotesState = state;
      stateCopy = { ...stateCopy, totalActSumm: 0, vat: 0 };
      return stateCopy;
    },
    changeSelectedNoteId: (state, action: PayloadAction<number>) => {
      let stateCopy: INotesState = state;
      stateCopy = { ...stateCopy, selectedNoteId: action.payload };
      return stateCopy;
    },
    changeSelectedOrganizationId: (state, action: PayloadAction<number>) => {
      let stateCopy: INotesState = state;
      stateCopy = { ...stateCopy, selectedOrganizationId: action.payload };
      return stateCopy;
    },
    changeSelectedActId: (state, action: PayloadAction<number>) => {
      let stateCopy: INotesState = state;
      stateCopy = { ...stateCopy, selectedActId: action.payload };
      return stateCopy;
    },
    editAllNotes: (state, action: PayloadAction<number>) => {
      let stateCopy: INotesState = state;
      stateCopy = {
        ...stateCopy,
        allNotes: [...stateCopy.allNotes.filter((el) => el.id !== action.payload)],
      };
      return stateCopy;
    },
    editNotesAfterDelete: (state, action: PayloadAction<number>) => {
      let stateCopy: INotesState = state;
      stateCopy = {
        ...stateCopy,
        allNotes: [...stateCopy.allNotes.filter((el) => el.id !== action.payload)],
      };
      return stateCopy;
    },
    editOrganizationsAfterDelete: (state, action: PayloadAction<number>) => {
      let stateCopy: INotesState = state;
      stateCopy = {
        ...stateCopy,
        allOrganizations: {
          ...stateCopy.allOrganizations,
          organizations: [
            ...stateCopy.allOrganizations.organizations.filter((el) => el.id !== action.payload),
          ],
        },
      };
      return stateCopy;
    },
    editOrganizationsAfterAdd: (state, action: PayloadAction<OrganizationResponse>) => {
      let stateCopy: INotesState = state;
      stateCopy = {
        ...stateCopy,
        allOrganizations: {
          ...stateCopy.allOrganizations,
          organizations: [...stateCopy.allOrganizations.organizations, action.payload],
        },
      };
      return stateCopy;
    },
    editOrganizationsAfterEdit: (state, action: PayloadAction<OrganizationResponse>) => {
      const stateCopy: INotesState = state;
      const currentElIndex = stateCopy.allOrganizations.organizations.findIndex(
        (el) => el.id === action.payload.id,
      );
      if (currentElIndex !== -1) {
        stateCopy.allOrganizations.organizations[currentElIndex] = { ...action.payload };
      }
      return stateCopy;
    },
    updateActTotalSumm: (state, action: PayloadAction<string>) => {
      let stateCopy: INotesState = state;
      const totalSumm = stateCopy.actDataFromFile.act.reduce((sum, act) => sum + act.works
        .reduce((workSum, work) => workSum + (work.totalSumm || 0), 0), 0);

      stateCopy = {
        ...stateCopy,
        totalActSumm: +totalSumm.toFixed(2),
        vat: action.payload !== 'Для жилых помещений' ? +(totalSumm / 6).toFixed(2) : 0,
      };
      return stateCopy;
    },
    updateActDataFromFile: (state, action: PayloadAction<UpdateActDataFromFileReq>) => {
      const newState: INotesState = { ...state };

      const { actDataFromFile } = newState;
      const { type, workName, value } = action.payload;

      const actIndex = actDataFromFile.act.findIndex((el) => el.type === type);

      if (actIndex !== -1) {
        const workIndex = actDataFromFile.act[actIndex]
          .works.findIndex((work) => work.name === workName);

        if (workIndex !== -1) {
          const currentWork = actDataFromFile.act[actIndex].works[workIndex];
          const regexp = /^[0-9]{0,}(\.[0-9]{0,3})?$/g;

          if (value.match(regexp)) {
            currentWork.count = value;
          }

          if (value !== '') {
            currentWork.totalSumm = +(currentWork.price * parseFloat(value)).toFixed(2);
          } else {
            currentWork.totalSumm = 0;
          }
        }
      }
    },
    resetActData: (state, action: PayloadAction<string>) => {
      let newState: INotesState = { ...state };

      const { actDataFromFile } = newState;
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
      newState = {
        ...newState,
        totalActSumm: 0,
        vat: 0,
      };
    },
    editActsListAfterDelete: (state, action: PayloadAction<number>) => {
      let stateCopy: INotesState = state;
      stateCopy = {
        ...stateCopy,
        actsList: [
          ...stateCopy.actsList.filter((el) => el.id !== action.payload),
        ],
      };
      return stateCopy;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotes.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        allNotes: [...action.payload],
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(getAllNotes.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getAllFullNoteData.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, allFullNoteData: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getAllFullNoteData.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(editExistedNote.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        editedNoteId: 0,
      };
      return stateCopy;
    });
    builder.addCase(editExistedNote.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, editedNoteId: action.payload };
      return stateCopy;
    });
    builder.addCase(editExistedNote.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(createOrganization.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        createdOrganization: { ...organizationDefault },
      };
      return stateCopy;
    });
    builder.addCase(createOrganization.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, createdOrganization: { ...action.payload } };
      return stateCopy;
    });
    builder.addCase(createOrganization.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(searchOrganizations.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(searchOrganizations.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        allOrganizations: {
          totalPage: action.payload.totalPage,
          organizations: [...action.payload.organizations],
        },
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(searchOrganizations.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(organizationsBySearch.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(organizationsBySearch.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        allOrganizationsBySearch: [...action.payload],
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(organizationsBySearch.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(deleteOrganization.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(deleteOrganization.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        deletedOrganizationId: action.payload,
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(deleteOrganization.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(editOrganization.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(editOrganization.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        editedOrganization: { ...action.payload },
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(editOrganization.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getNotesWithoutActs.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(getNotesWithoutActs.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        notesWithoutAct: [...action.payload],
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(getNotesWithoutActs.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getActTypesFromFile.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        actTypesFromFile: [...action.payload],
      };
      return stateCopy;
    });
    builder.addCase(getActTypesFromFile.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getActDataFromFile.fulfilled, (state, action) => {
      let stateCopy = state;

      stateCopy = {
        ...stateCopy,
        actDataFromFile: action.payload,
      };

      return stateCopy;
    });
    builder.addCase(getActDataFromFile.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(deleteNote.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        deletedNoteId: action.payload,
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(streetsBySearch.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(streetsBySearch.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        streetsBySearch: [...action.payload],
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(streetsBySearch.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(createNewAct.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(createNewAct.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        createdActId: action.payload,
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(createNewAct.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getActsList.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(getActsList.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        actsList: action.payload.actsList,
        totalActsListCount: action.payload.totalActsListPagesCount,
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(getActsList.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(deleteAct.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        requestStatus: 'pending',
      };
      return stateCopy;
    });
    builder.addCase(deleteAct.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        deletedActId: action.payload,
        requestStatus: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(deleteAct.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const {
  changeSelectedNoteId,
  changeSelectedOrganizationId,
  changeSelectedActId,
  editAllNotes,
  editNotesAfterDelete,
  changeMesPageType,
  editOrganizationsAfterDelete,
  editOrganizationsAfterAdd,
  editOrganizationsAfterEdit,
  updateActDataFromFile,
  resetTotalActSummVat,
  updateActTotalSumm,
  resetActData,
  editActsListAfterDelete,
} = mesReducer.actions;

export default mesReducer.reducer;
