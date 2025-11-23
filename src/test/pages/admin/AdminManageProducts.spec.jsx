import React from 'react';
import { render } from '@testing-library/react';
import AdminManageProducts from '../../../../src/pages/admin/AdminManageProducts.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthContext';

describe('AdminManageProducts', () => {
  it('renderiza sin fallos', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminManageProducts />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});
