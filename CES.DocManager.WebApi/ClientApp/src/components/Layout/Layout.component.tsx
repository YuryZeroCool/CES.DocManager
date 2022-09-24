import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Header/Header.container';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
