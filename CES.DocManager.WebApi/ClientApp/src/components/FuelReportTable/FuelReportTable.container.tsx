import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/combineReducers';
import {
  Division,
  DivisionData,
  FuelReportResponse,
  IGetFuelReportInfoResponse,
} from '../../types/ReportTypes';
import FuelReportTableComponent from './FuelReportTable.component';

function FuelReportTableContainer() {
  const [
    divisionsWithShiftsData,
    setDivisionsWithShiftsData,
  ] = useState<IGetFuelReportInfoResponse[]>([]);
  const [
    divisionsWithoutShiftsData,
    setDivisionsWithoutShiftsData,
  ] = useState<DivisionData[]>([]);

  const { fuelReportInfo, status } = useSelector<RootState, FuelReportResponse>(
    (state) => state.fuelReport,
  );

  const divisions = useSelector<RootState, Division[]>(
    (state) => state.divisions,
  );

  useEffect(() => {
    if (fuelReportInfo.length !== 0) {
      const data = fuelReportInfo.filter((el) => el.workCards.length === 1);
      const divisionsWithoutShifts = divisions.filter((el) => !el.division.startsWith('Смена'));
      const newDivisionsWithoutShiftsData: DivisionData[] = [];

      divisionsWithoutShifts.forEach((el: Division, index) => {
        const elem: DivisionData = {
          id: index + 1,
          divisionName: el.division,
          data: [],
        };
        data.forEach((elemData) => {
          if (elemData.workCards[0].division === el.division) {
            elem.data.push(elemData);
          }
        });
        newDivisionsWithoutShiftsData.push(elem);
      });
      setDivisionsWithShiftsData([...fuelReportInfo.filter((el) => el.workCards.length > 1)]);
      setDivisionsWithoutShiftsData(newDivisionsWithoutShiftsData);
    }
  }, [fuelReportInfo, divisions]);

  return (
    <FuelReportTableComponent
      fuelReportInfo={fuelReportInfo}
      divisionsWithShifts={divisionsWithShiftsData}
      divisionsWithoutShifts={divisionsWithoutShiftsData}
      status={status}
    />
  );
}

export default FuelReportTableContainer;
