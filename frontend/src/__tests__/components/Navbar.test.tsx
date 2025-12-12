import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Renderização básica', () => {
    it('deve renderizar a navbar', () => {
      const { container } = render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('deve renderizar logo da Netshoes', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const logos = screen.getAllByAltText('Logo Netshoes');
      expect(logos.length).toBeGreaterThan(0);
    });

    it('deve renderizar link para Home', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const homeLinks = screen.getAllByRole('link', { name: /Logo Netshoes/i });
      expect(homeLinks.length).toBeGreaterThan(0);
    });

    it('deve renderizar link para Wishlist', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const wishlistLinks = screen.getAllByLabelText('Ir para Wishlist');
      expect(wishlistLinks.length).toBeGreaterThan(0);
    });
  });

  describe('ProfileDropdown', () => {
    it('dropdown deve estar fechado inicialmente', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.queryByText('Entrar')).not.toBeInTheDocument();
      expect(screen.queryByText('Minha Conta')).not.toBeInTheDocument();
    });

    it('deve abrir dropdown ao clicar no botão do usuário', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const userButton = screen.getAllByLabelText('Abrir menu do usuário')[0];
      await user.click(userButton);

      await waitFor(() => {
        expect(screen.getByText('Entrar')).toBeInTheDocument();
      });

      expect(screen.getByText('Minha Conta')).toBeInTheDocument();
      expect(screen.getByText('Endereços')).toBeInTheDocument();
      expect(screen.getByText('Minha Netshoes')).toBeInTheDocument();
    });

    it('deve fechar dropdown ao clicar novamente no botão', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const userButton = screen.getAllByLabelText('Abrir menu do usuário')[0];

      await user.click(userButton);

      await waitFor(() => {
        expect(screen.getByText('Entrar')).toBeInTheDocument();
      });

      await user.click(userButton);

      await waitFor(() => {
        expect(screen.queryByText('Entrar')).not.toBeInTheDocument();
      });
    });

    it('deve renderizar todos os itens do dropdown', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const userButton = screen.getAllByLabelText('Abrir menu do usuário')[0];
      await user.click(userButton);

      await waitFor(() => {
        expect(screen.getByText('Entrar')).toBeInTheDocument();
        expect(screen.getByText('Minha Conta')).toBeInTheDocument();
        expect(screen.getByText('Endereços')).toBeInTheDocument();
        expect(screen.getByText('Minha Netshoes')).toBeInTheDocument();
      });
    });
  });

  describe('Click fora fecha dropdown', () => {
    it('deve fechar dropdown ao clicar fora', async () => {
      const user = userEvent.setup();

      const { container } = render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const userButton = screen.getAllByLabelText('Abrir menu do usuário')[0];
      await user.click(userButton);

      await waitFor(() => {
        expect(screen.getByText('Entrar')).toBeInTheDocument();
      });

      const nav = container.querySelector('nav');
      if (nav) {
        await user.click(nav);
      }

      await waitFor(() => {
        expect(screen.queryByText('Entrar')).not.toBeInTheDocument();
      });
    });
  });

  describe('Estrutura e estilos', () => {
    it('deve renderizar ícone de coração para wishlist', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const heartIcons = screen.getAllByTestId('nav-wishlist-icon');
      expect(heartIcons.length).toBeGreaterThan(0);
    });

    it('deve renderizar ícone de usuário', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const userButtons = screen.getAllByTestId('nav-user-icon');
      expect(userButtons.length).toBeGreaterThan(0);
    });
  });
});
