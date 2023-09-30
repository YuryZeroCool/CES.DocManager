import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import getAllNotes from '../../actions/mes/getAllNotes';
import getAllFullNoteData from '../../actions/mes/getAllFullNoteData';
import {
  ActDataFromFileResponse,
  INotesState,
  ISearchOrganization,
  OrganizationResponse,
} from '../../../types/MesTypes';
import editExistedNote from '../../actions/mes/editExistedNote';
import createOrganization from '../../actions/mes/createOrganization';
import deleteOrganization from '../../actions/mes/deleteOrganization';
import editOrganization from '../../actions/mes/editOrganization';
import searchOrganizations from '../../actions/mes/searchOrganizations';
import getNotesWithoutActs from '../../actions/mes/getNotesWithoutActs';
import getActTypesFromFile from '../../actions/mes/getActTypesFromFile';
import getActDataFromFile from '../../actions/mes/getActDataFromFile';
import deleteNote from '../../actions/mes/deleteNote';

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
  selectedOrganizationId: 0,
  editedOrganization: organizationDefault,
  deletedOrganizationId: 0,
  mesPageType: localStorage.getItem('mesPageType') || 'Заявки',
  notesWithoutAct: [],
  actTypesFromFile: [],
  actDataFromFile: actDataFromFileDefault,
  deletedNoteId: 0,
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
        actDataFromFile: { ...action.payload },
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
  },
});

export const {
  changeSelectedNoteId,
  changeSelectedOrganizationId,
  editAllNotes,
  editNotesAfterDelete,
  changeMesPageType,
  editOrganizationsAfterDelete,
  editOrganizationsAfterAdd,
  editOrganizationsAfterEdit,
} = mesReducer.actions;

export default mesReducer.reducer;
