/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createOrganization,
  deleteOrganization,
  editOrganization,
  getOrganizationType,
  searchOrganizations,
  checkOneTimeContractExist,
  organizationsBySearch,
} from 'redux/actions/mes';
import {
  OrganizationList, OrganizationResponse, OrganizationState,
} from 'types/mes/OrganizationTypes';

const organizationDefault = {
  id: 0,
  name: '',
  payerAccountNumber: '',
  address: '',
  email: '',
  phone: '',
  organizationType: null,
};

const searchOrganizationsDefault: OrganizationList = {
  totalPage: 1,
  organizations: [],
};

const initial: OrganizationState = {
  organizationError: '',
  requestStatus: '',
  createdOrganization: organizationDefault,
  allOrganizations: searchOrganizationsDefault,
  allOrganizationsBySearch: [],
  selectedOrganizationId: 0,
  editedOrganization: organizationDefault,
  deletedOrganizationId: 0,
  organizationTypes: [],
  oneTimeContractCheck: null,
};

const organizationReducer = createSlice({
  name: 'organization',
  initialState: initial,
  reducers: {
    editOrganizationsAfterAdd: (state, action: PayloadAction<OrganizationResponse>) => {
      state.allOrganizations.organizations = [
        action.payload,
        ...state.allOrganizations.organizations,
      ];
    },
    editOrganizationsAfterEdit: (state, action: PayloadAction<OrganizationResponse>) => {
      const organizationsList = state.allOrganizations.organizations;
      const index = organizationsList.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) organizationsList[index] = action.payload;
    },
    editOrganizationsAfterDelete: (state, action: PayloadAction<number>) => {
      state.allOrganizations.organizations = state.allOrganizations.organizations
        .filter((el) => el.id !== action.payload);
      state.allOrganizations.totalPage -= 1;
      state.selectedOrganizationId = 0;
    },
    changeSelectedOrganizationId: (state, action: PayloadAction<number>) => {
      state.selectedOrganizationId = action.payload;
    },
    resetOrganizationsBySearch: (state) => {
      state.allOrganizationsBySearch = [];
    },
    resetOneTimeContractCheck: (state) => {
      state.oneTimeContractCheck = null;
    },
  },
  extraReducers: (builder) => {
    // create
    builder.addCase(createOrganization.pending, (state) => {
      state.requestStatus = 'pending';
      state.createdOrganization = { ...organizationDefault };
    });
    builder.addCase(createOrganization.fulfilled, (state, action) => {
      state.createdOrganization = action.payload;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(createOrganization.rejected, (state) => {
      state.requestStatus = 'rejected';
    });

    // delete
    builder.addCase(deleteOrganization.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(deleteOrganization.fulfilled, (state, action) => {
      state.deletedOrganizationId = action.payload;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(deleteOrganization.rejected, (state) => {
      state.requestStatus = 'rejected';
    });

    // edit
    builder.addCase(editOrganization.pending, (state) => {
      state.requestStatus = 'pending';
    });
    builder.addCase(editOrganization.fulfilled, (state, action) => {
      state.editedOrganization = action.payload;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(editOrganization.rejected, (state) => {
      state.requestStatus = 'rejected';
    });

    // list
    builder.addCase(searchOrganizations.pending, (state) => {
      state.organizationError = '';
      state.requestStatus = 'pending';
    });
    builder.addCase(searchOrganizations.fulfilled, (state, action) => {
      state.allOrganizations.totalPage = action.payload.totalPage;
      state.allOrganizations.organizations = action.payload.organizations;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(searchOrganizations.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.allOrganizations.totalPage = 0;
      state.allOrganizations.organizations = [];
      state.organizationError = action.payload?.message ?? 'Ошибка поиска организаций';
    });

    // search
    builder.addCase(organizationsBySearch.pending, (state) => {
      state.organizationError = '';
      state.requestStatus = 'pending';
    });
    builder.addCase(organizationsBySearch.fulfilled, (state, action) => {
      state.allOrganizationsBySearch = action.payload;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(organizationsBySearch.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.allOrganizationsBySearch = [];
      state.organizationError = action.payload?.message ?? 'Ошибка поиска организаций';
    });

    // get type
    builder.addCase(getOrganizationType.fulfilled, (state, action) => {
      state.organizationTypes = action.payload;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(getOrganizationType.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.organizationError = action.payload?.message ?? 'Ошибка загрузки типов организаций';
    });

    // check one time contract exist
    builder.addCase(checkOneTimeContractExist.pending, (state) => {
      state.requestStatus = 'pending';
      state.oneTimeContractCheck = null;
    });
    builder.addCase(checkOneTimeContractExist.fulfilled, (state, action) => {
      state.oneTimeContractCheck = action.payload;
      state.requestStatus = 'fulfilled';
    });
    builder.addCase(checkOneTimeContractExist.rejected, (state, action) => {
      state.requestStatus = 'rejected';
      state.oneTimeContractCheck = null;
      state.organizationError = action.payload?.message ?? 'Ошибка проверки договора';
    });
  },
});

export const {
  editOrganizationsAfterDelete,
  editOrganizationsAfterAdd,
  editOrganizationsAfterEdit,
  changeSelectedOrganizationId,
  resetOrganizationsBySearch,
  resetOneTimeContractCheck,
} = organizationReducer.actions;

export default organizationReducer.reducer;
