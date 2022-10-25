import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMaterialAttachedResponse, IMaterialsResponse, MaterialAttached } from '../../../types/ReportTypes';
import addDecommissionedMaterial from '../../actions/report/materialReport/addDecommissionedMaterials';
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
  actOfWriteoffOfSpareParts: null,
};

const materialsReducer = createSlice({
  name: 'materials',
  initialState: initial,
  reducers: {
    editAllMaterials: (state, action: PayloadAction<IMaterialAttachedResponse>) => {
      const stateCopy: IMaterialsResponse = state;
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
          if (stateCopy.getAllMaterials[currentElemId].party.length === 0) {
            stateCopy.getAllMaterials.splice(currentElemId, 1);
          }
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
  },
  extraReducers: (builder) => {
    builder.addCase(uploadNewMaterials.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, uploadMaterialsMessage: action.payload };
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
  resetCreatedAttachedMaterial,
  deleteFromAttachedMaterials,
  changeMaterialsTableType,
  changePageType,
  resetDefectiveSheet,
} = materialsReducer.actions;
export default materialsReducer.reducer;
