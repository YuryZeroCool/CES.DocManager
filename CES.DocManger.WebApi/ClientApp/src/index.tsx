import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';
import App from './App';
import DocumentsPage from './components/Documents/DocumentsPage';
import DriversPage from './components/Drivers/DriversPage';
import ReportPage from './components/Report/ReportPage';
import TechniquePage from './components/Technique/TechniquePage';
import Login from './components/Users/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/Layout';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="technique" element={<TechniquePage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
