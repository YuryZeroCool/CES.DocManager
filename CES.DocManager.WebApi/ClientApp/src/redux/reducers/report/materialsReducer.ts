import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';
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
import deleteDecommissionedMaterial from '../../actions/report/materialReport/deleteDecommissionedMaterial';
import deleteMaterial from '../../actions/report/materialReport/deleteMaterial';
import downloadActOfWriteoffOfSpareParts from '../../actions/report/materialReport/downloadActOfWriteoffOfSpareParts';
import downloadActOfWritingOffMaterials from '../../actions/report/materialReport/downloadActOfWritingOffMaterials';
import getAllAttachedMaterials from '../../actions/report/materialReport/getAllAttachedMaterials';
import getAllDecommissionedMaterials from '../../actions/report/materialReport/getAllDecommissionedMaterials';
import getAllGroupAccounts from '../../actions/report/materialReport/getAllGroupAccounts';
import getAllMaterials from '../../actions/report/materialReport/getAllMaterials';
import getAllMechanics from '../../actions/report/materialReport/getAllMechanics';
import getAllUsedMaterials from '../../actions/report/materialReport/getAllUsedMaterials';
import getDefectiveSheet from '../../actions/report/materialReport/getDefectiveSheet';
import patchAttachedMaterial from '../../actions/report/materialReport/patchAttachedMaterial';
import uploadNewMaterials from '../../actions/report/materialReport/uploadNewMaterials';

const defaultAttachedMaterial: IMaterialAttachedResponse = {
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
};

const initial: IMaterialsResponse = {
  uploadMaterialsMessage: '',
  isUploadNewMaterialsLoader: false,
  allMaterials: [],
  totalCount: '',
  totalSum: '',
  allAttachedMaterials: [],
  deletedMaterialId: 0,
  accountsList: [],
  currentGroupAccount: [],
  status: '',
  rowActiveId: 0,
  attachedMaterial: {
    party: '',
    count: 0,
    numberPlateOfCar: '',
    brand: '',
    unit: '',
  },
  createdAttachedMaterial: defaultAttachedMaterial,
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
  deletedDecommissionedMaterialId: 0,
  defectiveSheet: '',
  actOfWriteoffOfSpareParts: '',
  actOfWritingOffMaterials: '',
  searchValue: {
    materialsSearchValue: '',
    attachedMaterialsSearchValue: '',
    decommissionedMaterialsSearchValue: '',
    usedMaterialSearchValue: '',
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
  allUsedMaterials: [],
  isCheckedByDate: false,
  editedAttachedMaterial: defaultAttachedMaterial,
  period: null,
};

const materialsReducer = createSlice({
  name: 'materials',
  initialState: initial,
  reducers: {
    deleteFromMaterials: (state, action: PayloadAction<number>) => {
      const stateCopy: IMaterialsResponse = state;
      const chosenMaterial = stateCopy.allMaterials.filter(
        (material: Product) => material.party.filter(
          (el) => el.partyId === action.payload,
        ).length !== 0,
      )[0];
      const chosenElemIndex = stateCopy.allMaterials.findIndex(
        (el) => el.id === chosenMaterial.id,
      );

      if (chosenMaterial.party.length === 1) {
        stateCopy.allMaterials.splice(chosenElemIndex, 1);
      } else {
        const parties = chosenMaterial.party.filter(
          (el) => el.partyId !== action.payload,
        );
        stateCopy.allMaterials[chosenElemIndex].party = [...parties];
      }
      return stateCopy;
    },
    editAllMaterialsAttachingMaterial: (
      state,
      action: PayloadAction<IMaterialAttachedResponse>,
    ) => {
      const stateCopy: IMaterialsResponse = state;
      const currentElemIndex = stateCopy.allMaterials.findIndex(
        (el) => el.name === action.payload.nameMaterial,
      );
      if (currentElemIndex === -1) throw new Error('Не удалось отредактировать материал. Такого материала не найдено. Перезагрузите страницу.');
      const currentElem = stateCopy.allMaterials.filter(
        (el) => el.name === action.payload.nameMaterial,
      )[0];

      const currentPartyIndex = currentElem.party.findIndex(
        (el) => el.partyName === action.payload.nameParty,
      );
      if (currentPartyIndex === -1) throw new Error('Не удалось отредактировать материал. Такой партии не нейдено. Перезагрузите страницу.');
      const currentParty = currentElem.party.filter(
        (el) => el.partyName === action.payload.nameParty,
      )[0];

      const finalCount = Math.round((currentParty.count - action.payload.count) * 1000) / 1000;
      stateCopy.totalCount = (
        Math.round((Number(stateCopy.totalCount) - action.payload.count) * 1000) / 1000
      ).toString();
      stateCopy.totalSum = (
        Number(stateCopy.totalSum) - Number(
          (action.payload.count * action.payload.price).toFixed(2),
        )
      ).toFixed(2);

      if (finalCount <= 0) {
        const parties = currentElem.party.filter(
          (el) => el.partyName !== action.payload.nameParty,
        );
        stateCopy.allMaterials[currentElemIndex].party.splice(
          0,
          stateCopy.allMaterials[currentElemIndex].party.length,
          ...parties,
        );
        if (stateCopy.allMaterials[currentElemIndex].party.length === 0) {
          stateCopy.allMaterials.splice(currentElemIndex, 1);
        }
      } else {
        stateCopy.allMaterials[currentElemIndex].party[currentPartyIndex].count = finalCount;
        stateCopy.allMaterials[currentElemIndex].party[currentPartyIndex].totalSum = Number(
          (
            finalCount * stateCopy.allMaterials[currentElemIndex].party[currentPartyIndex].price
          ).toFixed(2),
        );
      }
      return stateCopy;
    },
    editAllMaterialsWritingOffMaterial: (
      state,
      action: PayloadAction<Product>,
    ) => {
      const stateCopy: IMaterialsResponse = state;
      const currentElemIndex = stateCopy.allMaterials.findIndex(
        (el) => el.name === action.payload.name,
      );
      if (currentElemIndex === -1) throw new Error('Не удалось отредактировать материал. Такого материала не найдено. Перезагрузите страницу.');
      const currentElem = stateCopy.allMaterials.filter(
        (el) => el.name === action.payload.name,
      )[0];

      const currentPartyIndex = currentElem.party.findIndex(
        (el) => el.partyName === action.payload.party[0].partyName,
      );
      if (currentPartyIndex === -1) throw new Error('Не удалось отредактировать материал. Такой партии не нейдено. Перезагрузите страницу.');
      const currentParty = currentElem.party.filter(
        (el) => el.partyName === action.payload.party[0].partyName,
      )[0];

      const finalCount = (
        Math.round((currentParty.count - action.payload.party[0].count) * 1000) / 1000
      );
      stateCopy.totalCount = (
        Math.round((Number(stateCopy.totalCount) - action.payload.party[0].count) * 1000) / 1000
      ).toString();
      stateCopy.totalSum = (
        Number(stateCopy.totalSum) - Number(
          (action.payload.party[0].count * action.payload.party[0].price).toFixed(2),
        )
      ).toFixed(2);

      if (finalCount <= 0) {
        const parties = currentElem.party.filter(
          (el) => el.partyName !== action.payload.party[0].partyName,
        );
        stateCopy.allMaterials[currentElemIndex].party.splice(
          0,
          stateCopy.allMaterials[currentElemIndex].party.length,
          ...parties,
        );
        if (stateCopy.allMaterials[currentElemIndex].party.length === 0) {
          stateCopy.allMaterials.splice(currentElemIndex, 1);
        }
      } else {
        stateCopy.allMaterials[currentElemIndex].party[currentPartyIndex].count = finalCount;
        stateCopy.allMaterials[currentElemIndex].party[currentPartyIndex].totalSum = Number(
          (
            finalCount * stateCopy.allMaterials[currentElemIndex].party[currentPartyIndex].price
          ).toFixed(2),
        );
      }
      return stateCopy;
    },
    resetAllMaterials: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = { ...stateCopy, allMaterials: [] };
      return stateCopy;
    },
    addToCurrentGroupAccount: (state, action: PayloadAction<string[]>) => {
      let stateCopy: IMaterialsResponse = state;
      if (stateCopy.currentGroupAccount) {
        stateCopy = {
          ...stateCopy,
          currentGroupAccount: [...action.payload],
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
    resetEditedAttachedMaterial: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        editedAttachedMaterial: { ...initial.editedAttachedMaterial },
      };
      return stateCopy;
    },
    resetAllUsedMaterials: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = { ...stateCopy, allUsedMaterials: [] };
      return stateCopy;
    },
    editAttachedMaterial: (state, action: PayloadAction<IMaterialAttachedResponse>) => {
      const stateCopy: IMaterialsResponse = state;
      const currentEl = stateCopy.allAttachedMaterials.findIndex(
        (el) => el.id === action.payload.id,
      );
      if (currentEl !== -1) {
        stateCopy.allAttachedMaterials[currentEl] = { ...action.payload };
      }
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
    deleteFromDecommissionedMaterials: (state, action: PayloadAction<number>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        allDecommissionedMaterials: stateCopy.allDecommissionedMaterials.filter(
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
    changeUsedMaterialsSearchValue: (state, action: PayloadAction<string>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        searchValue: { ...stateCopy.searchValue, usedMaterialSearchValue: action.payload },
      };
      return stateCopy;
    },
    toggleCheckboxByDateInMaterials: (state, action: PayloadAction<boolean>) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        isCheckedByDate: action.payload,
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
    resetUsedMaterial: (state) => {
      let stateCopy: IMaterialsResponse = state;
      stateCopy = {
        ...stateCopy,
        usedMaterial: initial.usedMaterial,
      };
      return stateCopy;
    },
    changePeriod: (state, action: PayloadAction<Dayjs>) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        period: action.payload,
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
        allMaterials: [...action.payload.data],
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
      stateCopy = { ...stateCopy, accountsList: [...action.payload] };
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

    builder.addCase(downloadActOfWritingOffMaterials.fulfilled, (state, action) => {
      let stateCopy = state;
      if (action.payload !== null) {
        stateCopy = { ...stateCopy, actOfWritingOffMaterials: action.payload };
      }
      return stateCopy;
    });
    builder.addCase(downloadActOfWritingOffMaterials.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getAllUsedMaterials.pending, (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, status: 'pending' };
      return stateCopy;
    });
    builder.addCase(getAllUsedMaterials.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = {
        ...stateCopy,
        allUsedMaterials: [...action.payload],
        status: 'fulfilled',
      };
      return stateCopy;
    });
    builder.addCase(getAllUsedMaterials.rejected, (state, action) => {
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

    builder.addCase(deleteDecommissionedMaterial.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, deletedDecommissionedMaterialId: action.payload };
      return stateCopy;
    });
    builder.addCase(deleteDecommissionedMaterial.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(patchAttachedMaterial.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, editedAttachedMaterial: { ...action.payload } };
      return stateCopy;
    });
    builder.addCase(patchAttachedMaterial.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const {
  deleteFromMaterials,
  editAllMaterialsAttachingMaterial,
  editAllMaterialsWritingOffMaterial,
  addToCurrentGroupAccount,
  resetAllMaterials,
  resetAllAttachedMaterials,
  resetAllUsedMaterials,
  changeStatus,
  changeRowActiveId,
  changeAttachedMaterial,
  resetAttachedMaterial,
  resetEditedAttachedMaterial,
  editAttachedMaterial,
  resetCreatedAttachedMaterial,
  deleteFromAttachedMaterials,
  deleteFromDecommissionedMaterials,
  changeMaterialsTableType,
  changePageType,
  resetDefectiveSheet,
  changeMaterialsSearchValue,
  changeAttachedMaterialsSearchValue,
  changeDecommissionedMaterialsSearchValue,
  changeUsedMaterialsSearchValue,
  toggleCheckboxByDateInMaterials,
  changeUploadMaterialsMessage,
  changeIsUploadNewMaterialsLoader,
  resetUsedMaterial,
  changePeriod,
} = materialsReducer.actions;
export default materialsReducer.reducer;
