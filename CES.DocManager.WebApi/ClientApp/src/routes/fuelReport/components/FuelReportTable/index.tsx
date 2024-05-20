import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Group, Stack, Text } from '@mantine/core';
import { RootState } from '../../../../redux/reducers/combineReducers';
import {
  Division,
  DivisionData,
  FuelReportResponse,
  IGetFuelReportInfoResponse,
} from '../../../../types/ReportTypes';
import DivisionsWithShiftsTable from './components/DivisionsWithShiftsTable';
import DivisionsWithoutShiftsTable from './components/DivisionsWithoutShiftsTable';

function FuelReportTable() {
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
    <Group w="100%">
      {fuelReportInfo.length !== 0 && (
        <>
          <DivisionsWithShiftsTable divisionsWithShifts={divisionsWithShiftsData} />
          <DivisionsWithoutShiftsTable divisionsWithoutShifts={divisionsWithoutShiftsData} />
        </>
      )}

      {fuelReportInfo.length === 0 && status === 'fulfilled' && (
        <Stack align="center" justify="center" w="100%">
          <Text style={{ fontSize: 18, color: 'red' }}>
            По выбранному периоду нет данных
          </Text>
        </Stack>
      )}
    </Group>
  );
}

export default memo(FuelReportTable);
