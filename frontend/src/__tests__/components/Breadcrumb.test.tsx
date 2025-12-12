import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import Breadcrumb from '../../components/Breadcrumb';

describe('Breadcrumb', () => {
  describe('Path "/" renderiza "Home"', () => {
    it('deve renderizar apenas "Home" quando path é "/"', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Breadcrumb />
        </MemoryRouter>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('deve renderizar "Home" como span (não link) quando é a única página', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Breadcrumb />
        </MemoryRouter>
      );

      const homeElement = screen.getByText('Home');
      expect(homeElement.tagName).toBe('SPAN');
      expect(homeElement).toHaveClass('font-bold');
    });
  });

  describe('Múltiplos segmentos', () => {
    it('deve renderizar Home e Wishlist quando path é "/wishlist"', () => {
      render(
        <MemoryRouter initialEntries={['/wishlist']}>
          <Breadcrumb />
        </MemoryRouter>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Wishlist')).toBeInTheDocument();
    });

    it('deve renderizar separadores entre os itens', () => {
      render(
        <MemoryRouter initialEntries={['/wishlist']}>
          <Breadcrumb />
        </MemoryRouter>
      );

      const separators = screen.getAllByTestId('breadcrumb-separator');
      expect(separators).toHaveLength(1);
      expect(separators[0]).toHaveTextContent('/');
    });

    it('deve renderizar itens intermediários como links', () => {
      render(
        <MemoryRouter initialEntries={['/wishlist']}>
          <Breadcrumb />
        </MemoryRouter>
      );

      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('deve renderizar último item como span em vez de link', () => {
      render(
        <MemoryRouter initialEntries={['/wishlist']}>
          <Breadcrumb />
        </MemoryRouter>
      );

      const wishlistElement = screen.getByText('Wishlist');
      expect(wishlistElement.tagName).toBe('SPAN');
      expect(wishlistElement.closest('a')).toBeNull();
    });
  });

  describe('Capitalização de nomes', () => {
    it('deve capitalizar primeira letra de segmento simples', () => {
      render(
        <MemoryRouter initialEntries={['/wishlist']}>
          <Breadcrumb />
        </MemoryRouter>
      );

      expect(screen.getByText('Wishlist')).toBeInTheDocument();
    });

    it('deve capitalizar primeira letra mantendo resto minúsculo', () => {
      render(
        <MemoryRouter initialEntries={['/wishlist']}>
          <Breadcrumb />
        </MemoryRouter>
      );

      expect(screen.getByText('Wishlist')).toBeInTheDocument();
      expect(screen.queryByText('WISHLIST')).not.toBeInTheDocument();
      expect(screen.queryByText('wishlist')).not.toBeInTheDocument();
    });
  });
});
