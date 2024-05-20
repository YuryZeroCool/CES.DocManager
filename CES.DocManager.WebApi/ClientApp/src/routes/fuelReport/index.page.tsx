import React from 'react';
import { Stack } from '@mantine/core';
import classes from './fuelReportPage.module.scss';
import DivisionWorkScheduleAccordion from './components/DivisionWorkScheduleAccordion';
import FuelReportCalendarSection from './components/FuelReportCalendarSection';
import FuelReportTable from './components/FuelReportTable';

function FuelReportPage() {
  return (
    <Stack className={classes.reportPageSection} gap={15}>
      <DivisionWorkScheduleAccordion />
      <FuelReportCalendarSection />
      <FuelReportTable />
    </Stack>
  );
}

export default FuelReportPage;
