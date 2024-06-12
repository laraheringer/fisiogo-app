import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage, { Page, pages } from './HomePage';
import { BrowserRouter } from 'react-router-dom';

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter><HomePage /></BrowserRouter>
    )
  })

  pages.forEach((page: Page) => {
    it(`should render the ${page.title} card`, () => {
      expect(screen.getByText(page.title)).toBeInTheDocument();
      const link: HTMLElement = screen.getByRole('link',{name: page.title});
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', page.url);
    });
  });
});
