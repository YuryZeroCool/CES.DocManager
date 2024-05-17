import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import store from './redux/store/configureStore';
import HomePage from './routes/home/index.page';
import MaterialReportPage from './routes/materialReport/MaterialReportPage.container';
import FuelReportPage from './routes/fuelReport/FuelReportPage.container';
import DocumentsPage from './routes/documents/DocumentsPage.container';
import TechniquePage from './routes/technique/TechniquePage.container';
import DriversPage from './routes/drivers/DriversPage.container';
import LoginPage from './routes/login/index.page';
import MesPage from './routes/mes/MesPage.container';
import RequireAuth from './hoc/RequireAuth';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

const root = createRoot(document.getElementById('root') as Element);
const theme = createTheme({
  /** Put your mantine theme override here */
});

root.render(
  <Provider store={store}>
    <MantineProvider theme={theme}>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RequireAuth><HomePage /></RequireAuth>} />
            <Route path="report/materialReport" element={<RequireAuth><MaterialReportPage /></RequireAuth>} />
            <Route path="report/fuelReport" element={<RequireAuth><FuelReportPage /></RequireAuth>} />
            <Route path="documents" element={<RequireAuth><DocumentsPage /></RequireAuth>} />
            <Route path="technique" element={<RequireAuth><TechniquePage /></RequireAuth>} />
            <Route path="drivers" element={<RequireAuth><DriversPage /></RequireAuth>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="mes" element={<RequireAuth><MesPage /></RequireAuth>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </Provider>,
);
