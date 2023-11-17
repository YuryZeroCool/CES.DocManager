export interface ICreateDriverForm {
  firstName: string;
  lastName: string;
  birthdate: Date | null;
  division: string;
  personnelNumber: string;
}

export interface ICreateDriverRequest {
  firstName: string;
  lastName: string;
  dateBirth: string;
  divisionNumber: string;
  personnelNumber: number;
}

export interface ICreateDriverResponse extends ICreateDriverRequest {
  id: number;
}

export interface IDriverResponse {
  createdDriver: ICreateDriverResponse;
  isPersonnelNumberExist: boolean;
  driversByCarNumber: string[];
}
