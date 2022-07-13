import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';
import DocumentsPage from './components/documents/DocumentsPage';
import DriversPage from './components/drivers/DriversPage';
import ReportPage from './components/report/ReportPage';
import TechniquePage from './components/technique/TechniquePage';
import Login from './components/users/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/layout/Layout';
import App from './App';
import RequireAuth from './hoc/RequireAuth';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RequireAuth><App /></RequireAuth>} />
          <Route path="report" element={<RequireAuth><ReportPage /></RequireAuth>} />
          <Route path="documents" element={<RequireAuth><DocumentsPage /></RequireAuth>} />
          <Route path="technique" element={<RequireAuth><TechniquePage /></RequireAuth>} />
          <Route path="drivers" element={<RequireAuth><DriversPage /></RequireAuth>} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
