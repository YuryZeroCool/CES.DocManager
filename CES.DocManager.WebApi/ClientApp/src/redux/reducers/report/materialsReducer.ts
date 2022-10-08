import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMaterialAttachedResponse, IMaterialsResponse, MaterialAttached } from '../../../types/ReportTypes';
import createAttachedMaterial from '../../actions/report/materialReport/createAttachedMaterial';
import deleteAttachedMaterial from '../../actions/report/materialReport/deleteAttachedMaterial';
import deleteMaterial from '../../actions/report/materialReport/deleteMaterial';
import getAllAttachedMaterials from '../../actions/report/materialReport/getAllAttachedMaterials';
import getAllGroupAccounts from '../../actions/report/materialReport/getAllGroupAccounts';
import getAllMaterials from '../../actions/report/materialReport/getAllMaterials';

const initial: IMaterialsResponse = {
  getAllMaterials: [],
  allAttachedMaterials: [],
  deletedMaterialId: 0,
  getAllGroupAccounts: [],
  currentGroupAccount: [],
  status: '',
  rowActiveId: 0,
  accordionHeight: 0,
  attachedMaterial: {
    party: '',
    count: 0,
    numberPlateOfCar: '',
    brand: '',
  },
  createdAttachedMaterial: {
    id: 0,
    nameMaterial: '',
    nameParty: '',
    partyDate: '',
    unit: '',
    price: 0,
    count: 0,
    dateCreated: '',
    vehicleBrand: '',
    vehicleModel: '',
    numberPlateCar: '',
    accountName: '',
  },
  materialsTableType: 'Свободные',
  deletedAttachedMaterialId: 0,
};

const materialsReducer = createSlice({
  name: 'materials',
  initialState: initial,
  reducers: {
    editAllMaterials: (state, action: PayloadAction<IMaterialAttachedResponse>) => {
      const stateCopy: IMaterialsResponse = state;
      if (action.payload.nameMaterial === '') return stateCopy;
      if (stateCopy.getAllMaterials) {
        const currentElemId = stateCopy.getAllMaterials?.findIndex(
          (el) => el.name === action.payload.nameMaterial,
        );
        const currentElem = stateCopy.getAllMaterials.filter(
          (el) => el.name === action.payload.nameMaterial,
        );
        const currentPartyId = currentElem[0].party.findIndex(
          (el) => el.partyName === action.payload.nameParty,
        );
        const currentParty = currentElem[0].party.filter(
          (el) => el.partyName === action.payload.nameParty,
        );
        const finalCount = currentParty[currentPartyId].count - action.payload.count;

        if (finalCount <= 0) {
          const parties = currentElem[0].party.filter(
            (el) => el.partyName !== action.payload.nameParty,
          );
          stateCopy.getAllMaterials[currentElemId].party.splice(
            0,
            stateCopy.getAllMaterials[currentElemId].party.length,
            ...parties,
          );
        } else {
          stateCopy.getAllMaterials[currentElemId].party[currentPartyId].count = finalCount;
        }
      }
      return stateCopy;
    },
    resetAllMaterials: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = { ...stateCopy, getAllMaterials: [] };
      return stateCopy;
    },
    addToCurrentGroupAccount: (state, action: PayloadAction<string>) => {
      let stateCopy: IMaterialsResponse = state;
      if (stateCopy.currentGroupAccount) {
        stateCopy = {
          ...stateCopy,
          currentGroupAccount: [...stateCopy.currentGroupAccount, action.payload],
        };
      }
      return stateCopy;
    },
    deleteFromCurrentGroupAccount: (state, action: PayloadAction<string>) => {
      let stateCopy: IMaterialsResponse = state;
      if (stateCopy.currentGroupAccount) {
        stateCopy = {
          ...stateCopy,
          currentGroupAccount: stateCopy.currentGroupAccount.filter((el) => el !== action.payload),
        };
      }
      return stateCopy;
    },
    resetAllAttachedMaterials: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = { ...stateCopy, allAttachedMaterials: [] };
      return stateCopy;
    },
    changeStatus: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = { ...stateCopy, status: '' };
      return stateCopy;
    },
    changeRowActiveId: (state, action: PayloadAction<number>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = { ...stateCopy, rowActiveId: action.payload };
      return stateCopy;
    },
    changeAccordionHeight: (state, action: PayloadAction<number>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = { ...stateCopy, accordionHeight: action.payload };
      return stateCopy;
    },
    changeAttachedMaterial: (state, action: PayloadAction<MaterialAttached>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        attachedMaterial: { ...stateCopy.attachedMaterial, ...action.payload },
      };
      return stateCopy;
    },
    resetAttachedMaterial: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        attachedMaterial: { ...initial.attachedMaterial },
      };
      return stateCopy;
    },
    deleteFromAttachedMaterials: (state, action: PayloadAction<number>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        allAttachedMaterials: stateCopy.allAttachedMaterials.filter(
          (el) => el.id !== action.payload,
        ),
      };
      return stateCopy;
    },
    changeMaterialsTableType: (state, action: PayloadAction<string>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        materialsTableType: action.payload,
      };
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

    builder.addCase(getAllAttachedMaterials.pending, (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, status: 'pending' };
      return stateCopy;
    });
    builder.addCase(getAllAttachedMaterials.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, allAttachedMaterials: [...action.payload], status: 'fulfilled' };
      return stateCopy;
    });
    builder.addCase(getAllAttachedMaterials.rejected, (state, action) => {
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

    builder.addCase(deleteMaterial.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, deletedMaterialId: action.payload };
      return stateCopy;
    });
    builder.addCase(deleteMaterial.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(createAttachedMaterial.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, createdAttachedMaterial: action.payload };
      return stateCopy;
    });
    builder.addCase(createAttachedMaterial.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(deleteAttachedMaterial.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, deletedAttachedMaterialId: action.payload };
      return stateCopy;
    });
    builder.addCase(deleteAttachedMaterial.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const {
  editAllMaterials,
  addToCurrentGroupAccount,
  resetAllMaterials,
  resetAllAttachedMaterials,
  deleteFromCurrentGroupAccount,
  changeStatus,
  changeRowActiveId,
  changeAccordionHeight,
  changeAttachedMaterial,
  resetAttachedMaterial,
  deleteFromAttachedMaterials,
  changeMaterialsTableType,
} = materialsReducer.actions;
export default materialsReducer.reducer;
