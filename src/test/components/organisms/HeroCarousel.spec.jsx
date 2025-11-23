import React from 'react';
import { render } from '@testing-library/react';
import HeroCarousel from '../../../../src/components/organisms/HeroCarousel.jsx';

describe('HeroCarousel', () => {
  it('renderiza sin fallos', () => {
    render(<HeroCarousel />);
    expect(true).toBeTruthy();
  });
});
