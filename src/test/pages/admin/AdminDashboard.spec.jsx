import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminDashboard from '../../../../src/pages/admin/AdminDashboard.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthContext';

describe('AdminDashboard', () => {
  it('renderiza sin fallos', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <AdminDashboard />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});
