import React from 'react';
import { render } from '@testing-library/react';
import AdminViewOrders from '../../../../src/pages/admin/AdminViewOrders.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthContext';

describe('AdminViewOrders', () => {
  it('renderiza sin fallos', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminViewOrders />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});
