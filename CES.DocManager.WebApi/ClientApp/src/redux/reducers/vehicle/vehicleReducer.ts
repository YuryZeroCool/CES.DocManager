import { createSlice } from '@reduxjs/toolkit';
import { IVehicleResponse } from '../../../types/VehicleTypes';
import getAllBrands from '../../actions/vehicle/getAllBrands';
import getNumbersPlateOfCar from '../../actions/vehicle/getNumbersPlateOfCar';

const initial: IVehicleResponse = {
  allBrands: [],
  numbersPlateOfCar: [],
};

const vehicleReducer = createSlice({
  name: 'vehicle',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBrands.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, allBrands: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getAllBrands.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
    builder.addCase(getNumbersPlateOfCar.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, numbersPlateOfCar: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getNumbersPlateOfCar.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export default vehicleReducer.reducer;
