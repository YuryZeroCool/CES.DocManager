import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IMaterialAttachedResponse,
  IMaterialsResponse,
  MaterialAttached,
  Product,
} from '../../../types/ReportTypes';
import addDecommissionedMaterial from '../../actions/report/materialReport/addDecommissionedMaterials';
import addUsedMaterial from '../../actions/report/materialReport/addUsedMaterial';
import createAttachedMaterial from '../../actions/report/materialReport/createAttachedMaterial';
import deleteAttachedMaterial from '../../actions/report/materialReport/deleteAttachedMaterial';
import deleteMaterial from '../../actions/report/materialReport/deleteMaterial';
import downloadActOfWriteoffOfSpareParts from '../../actions/report/materialReport/downloadActOfWriteoffOfSpareParts';
import getAllAttachedMaterials from '../../actions/report/materialReport/getAllAttachedMaterials';
import getAllDecommissionedMaterials from '../../actions/report/materialReport/getAllDecommissionedMaterials';
import getAllGroupAccounts from '../../actions/report/materialReport/getAllGroupAccounts';
import getAllMaterials from '../../actions/report/materialReport/getAllMaterials';
import getAllMechanics from '../../actions/report/materialReport/getAllMechanics';
import getDefectiveSheet from '../../actions/report/materialReport/getDefectiveSheet';
import uploadNewMaterials from '../../actions/report/materialReport/uploadNewMaterials';

const initial: IMaterialsResponse = {
  uploadMaterialsMessage: '',
  isUploadNewMaterialsLoader: false,
  getAllMaterials: [],
  totalCount: '',
  totalSum: '',
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
  pageType: 'Материалы',
  materialsTableType: 'Свободные',
  deletedAttachedMaterialId: 0,
  allMechanics: [],
  decommissionedMaterial: {
    carMechanic: '',
    currentDate: null,
    materials: [],
  },
  allDecommissionedMaterials: [],
  defectiveSheet: '',
  actOfWriteoffOfSpareParts: '',
  searchValue: {
    materialsSearchValue: '',
    attachedMaterialsSearchValue: '',
    decommissionedMaterialsSearchValue: '',
  },
  usedMaterial: {
    count: 0,
    id: 0,
    nameMaterial: '',
    nameParty: '',
    partyDate: '',
    price: 0,
    unit: '',
  },
};

const materialsReducer = createSlice({
  name: 'materials',
  initialState: initial,
  reducers: {
    editAllMaterialsAttachingMaterial: (
      state,
      action: PayloadAction<IMaterialAttachedResponse>,
    ) => {
      const stateCopy: IMaterialsResponse = state;
      const currentElemIndex = stateCopy.getAllMaterials.findIndex(
        (el) => el.name === action.payload.nameMaterial,
      );
      if (currentElemIndex === -1) throw new Error('Такого материала не существует');
      const currentElem = stateCopy.getAllMaterials.filter(
        (el) => el.name === action.payload.nameMaterial,
      )[0];

      const currentPartyIndex = currentElem.party.findIndex(
        (el) => el.partyName === action.payload.nameParty,
      );
      if (currentPartyIndex === -1) throw new Error('Такой партии не существует');
      const currentParty = currentElem.party.filter(
        (el) => el.partyName === action.payload.nameParty,
      )[0];

      const finalCount = currentParty.count - action.payload.count;

      if (finalCount <= 0) {
        const parties = currentElem.party.filter(
          (el) => el.partyName !== action.payload.nameParty,
        );
        stateCopy.getAllMaterials[currentElemIndex].party.splice(
          0,
          stateCopy.getAllMaterials[currentElemIndex].party.length,
          ...parties,
        );
        if (stateCopy.getAllMaterials[currentElemIndex].party.length === 0) {
          stateCopy.getAllMaterials.splice(currentElemIndex, 1);
        }
      } else {
        stateCopy.getAllMaterials[currentElemIndex].party[currentPartyIndex].count = finalCount;
      }
      return stateCopy;
    },
    editAllMaterialsWritingOffMaterial: (
      state,
      action: PayloadAction<Product>,
    ) => {
      const stateCopy: IMaterialsResponse = state;
      const currentElemIndex = stateCopy.getAllMaterials.findIndex(
        (el) => el.name === action.payload.name,
      );
      if (currentElemIndex === -1) throw new Error('Такого материала не существует');
      const currentElem = stateCopy.getAllMaterials.filter(
        (el) => el.name === action.payload.name,
      )[0];

      const currentPartyIndex = currentElem.party.findIndex(
        (el) => el.partyName === action.payload.party[0].partyName,
      );
      if (currentPartyIndex === -1) throw new Error('Такой партии не существует');
      const currentParty = currentElem.party.filter(
        (el) => el.partyName === action.payload.party[0].partyName,
      )[0];

      const finalCount = currentParty.count - action.payload.party[0].count;

      if (finalCount <= 0) {
        const parties = currentElem.party.filter(
          (el) => el.partyName !== action.payload.party[0].partyName,
        );
        stateCopy.getAllMaterials[currentElemIndex].party.splice(
          0,
          stateCopy.getAllMaterials[currentElemIndex].party.length,
          ...parties,
        );
        if (stateCopy.getAllMaterials[currentElemIndex].party.length === 0) {
          stateCopy.getAllMaterials.splice(currentElemIndex, 1);
        }
      } else {
        stateCopy.getAllMaterials[currentElemIndex].party[currentPartyIndex].count = finalCount;
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
    resetCreatedAttachedMaterial: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        createdAttachedMaterial: { ...initial.createdAttachedMaterial },
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
    changePageType: (state, action: PayloadAction<string>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        pageType: action.payload,
      };
      return stateCopy;
    },
    resetDefectiveSheet: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        defectiveSheet: initial.defectiveSheet,
      };
      return stateCopy;
    },
    changeMaterialsSearchValue: (state, action: PayloadAction<string>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        searchValue: { ...stateCopy.searchValue, materialsSearchValue: action.payload },
      };
      return stateCopy;
    },
    changeAttachedMaterialsSearchValue: (state, action: PayloadAction<string>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        searchValue: { ...stateCopy.searchValue, attachedMaterialsSearchValue: action.payload },
      };
      return stateCopy;
    },
    changeDecommissionedMaterialsSearchValue: (state, action: PayloadAction<string>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        searchValue: {
          ...stateCopy.searchValue,
          decommissionedMaterialsSearchValue: action.payload,
        },
      };
      return stateCopy;
    },
    changeUploadMaterialsMessage: (state, action: PayloadAction<string>) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        uploadMaterialsMessage: action.payload,
      };
      return stateCopy;
    },
    changeIsUploadNewMaterialsLoader: (state, action: PayloadAction<boolean>) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        isUploadNewMaterialsLoader: action.payload,
      };
      return stateCopy;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadNewMaterials.pending, (state) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        isUploadNewMaterialsLoader: true,
        uploadMaterialsMessage: '',
      };
      return stateCopy;
    });
    builder.addCase(uploadNewMaterials.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        uploadMaterialsMessage: action.payload,
        isUploadNewMaterialsLoader: false,
      };
      return stateCopy;
    });
    builder.addCase(uploadNewMaterials.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getAllMaterials.pending, (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, status: 'pending' };
      return stateCopy;
    });
    builder.addCase(getAllMaterials.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        getAllMaterials: [...action.payload.data],
        totalCount: action.payload.totalCount,
        totalSum: action.payload.totalSum,
        status: 'fulfilled',
      };
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

    builder.addCase(getAllMechanics.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, allMechanics: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getAllMechanics.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(addDecommissionedMaterial.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, decommissionedMaterial: { ...action.payload } };
      return stateCopy;
    });
    builder.addCase(addDecommissionedMaterial.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getAllDecommissionedMaterials.pending, (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, status: 'pending' };
      return stateCopy;
    });
    builder.addCase(getAllDecommissionedMaterials.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, allDecommissionedMaterials: [...action.payload], status: 'fulfilled' };
      return stateCopy;
    });
    builder.addCase(getAllDecommissionedMaterials.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getDefectiveSheet.fulfilled, (state, action) => {
      let stateCopy = state;
      if (action.payload !== null) {
        stateCopy = { ...stateCopy, defectiveSheet: action.payload };
      }
      return stateCopy;
    });
    builder.addCase(getDefectiveSheet.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(downloadActOfWriteoffOfSpareParts.fulfilled, (state, action) => {
      let stateCopy = state;
      if (action.payload !== null) {
        stateCopy = { ...stateCopy, actOfWriteoffOfSpareParts: action.payload };
      }
      return stateCopy;
    });
    builder.addCase(downloadActOfWriteoffOfSpareParts.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(addUsedMaterial.fulfilled, (state, action) => {
      let stateCopy = state;
      if (action.payload !== null) {
        stateCopy = { ...stateCopy, usedMaterial: { ...action.payload } };
      }
      return stateCopy;
    });
    builder.addCase(addUsedMaterial.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const {
  editAllMaterialsAttachingMaterial,
  editAllMaterialsWritingOffMaterial,
  addToCurrentGroupAccount,
  resetAllMaterials,
  resetAllAttachedMaterials,
  deleteFromCurrentGroupAccount,
  changeStatus,
  changeRowActiveId,
  changeAccordionHeight,
  changeAttachedMaterial,
  resetAttachedMaterial,
  resetCreatedAttachedMaterial,
  deleteFromAttachedMaterials,
  changeMaterialsTableType,
  changePageType,
  resetDefectiveSheet,
  changeMaterialsSearchValue,
  changeAttachedMaterialsSearchValue,
  changeDecommissionedMaterialsSearchValue,
  changeUploadMaterialsMessage,
  changeIsUploadNewMaterialsLoader,
} = materialsReducer.actions;
export default materialsReducer.reducer;
