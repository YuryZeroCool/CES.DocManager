export interface IBrand {
  id: number;
  nameBrand: string;
}

export interface INumberPlateOfCar {
  id: number;
  number: string;
}

export type IAllBrandsResponse = IBrand[];

export type INumbersPlateOfCarResponse = INumberPlateOfCar[];

export interface IVehicleResponse {
  allBrands?: IAllBrandsResponse;
  numbersPlateOfCar?: INumbersPlateOfCarResponse;
}
