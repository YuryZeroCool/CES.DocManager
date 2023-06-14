import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';
import Layout from './components/Layout/Layout.component';
import HomePage from './routes/home/HomePage.container';
import MaterialReportPage from './routes/materialReport/MaterialReportPage.container';
import FuelReportPage from './routes/fuelReport/FuelReportPage.container';
import DocumentsPage from './routes/documents/DocumentsPage.container';
import TechniquePage from './routes/technique/TechniquePage.container';
import DriversPage from './routes/drivers/DriversPage.container';
import LoginPage from './routes/login/LoginPage.container';
import MesPage from './routes/mes/MesPage.container';
import RequireAuth from './hoc/RequireAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

const root = createRoot(document.getElementById('root') as Element);

root.render(
  <Provider store={store}>
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
  </Provider>,
);
