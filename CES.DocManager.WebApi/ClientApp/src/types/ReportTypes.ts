export interface Division {
  id: number,
  division: string,
}

export interface IDivisionWorkSchedule {
  id: number,
}

export interface IDivisionWorkScheduleRequest {
  division?: string;
  dates?: string[];
}

export interface ICreateDivisionWorkScheduleResponse extends IDivisionWorkScheduleRequest {
  id: number
}

export type IAllDivisionWorkSchedulesResponse = ICreateDivisionWorkScheduleResponse[];

export interface DivisionWorkScheduleResponse {
  delete?: IDivisionWorkSchedule;
  create?: ICreateDivisionWorkScheduleResponse;
  getAll?: IAllDivisionWorkSchedulesResponse,
}
