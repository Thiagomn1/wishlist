import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import Wishlist from '../../pages/Wishlist';
import { wishlistApi } from '../../services/api';
import { mockProducts } from '../mocks/mockData';
import { toast } from 'react-toastify';

vi.mock('../../services/api', () => ({
  wishlistApi: {
    getWishlist: vi.fn(),
    removeFromWishlist: vi.fn(),
  },
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('../../components/Breadcrumb', () => ({
  default: () => <div data-testid="breadcrumb">Breadcrumb</div>,
}));

vi.mock('../../components/ProductCard', () => ({
  default: ({
    product,
    onToggle,
    isWishlistPage,
  }: {
    product: { code: string; name: string };
    onToggle: (product: { code: string; name: string }) => void;
    isWishlistPage: boolean;
  }) => (
    <div data-testid={`product-${product.code}`}>
      <h3>{product.name}</h3>
      <span data-testid="wishlist-page-flag">
        {isWishlistPage ? 'Wishlist' : 'Home'}
      </span>
      <button
        onClick={() => onToggle(product)}
        data-testid={`remove-${product.code}`}
      >
        Remover
      </button>
    </div>
  ),
}));

describe('Wishlist', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Carregamento inicial', () => {
    it('deve exibir estado de carregamento inicialmente', () => {
      vi.mocked(wishlistApi.getWishlist).mockImplementation(
        () => new Promise(() => {})
      );

      render(
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      );

      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });
  });

  describe('Exibição da wishlist após fetch', () => {
    it('deve carregar e exibir produtos da wishlist com sucesso', async () => {
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue(mockProducts);

      render(
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('product-D22-2077-006')).toBeInTheDocument();
      expect(screen.getByTestId('product-NQQ-4378-028')).toBeInTheDocument();
      expect(screen.getByTestId('product-3R2-0087-240-02')).toBeInTheDocument();
    });

    it('deve renderizar corretamente quando wishlist está vazia', async () => {
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([]);

      render(
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
      });

      expect(screen.queryByTestId(/product-/)).not.toBeInTheDocument();
    });

    it('deve renderizar breadcrumb após carregamento', async () => {
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue(mockProducts);

      render(
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
      });
    });

    it('deve passar isWishlistPage=true para ProductCard', async () => {
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([mockProducts[0]]);

      render(
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('wishlist-page-flag')).toHaveTextContent(
        'Wishlist'
      );
    });
  });

  describe('Remoção de items', () => {
    it('deve remover produto da wishlist ao clicar no botão', async () => {
      const user = userEvent.setup();

      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([mockProducts[0]]);
      vi.mocked(wishlistApi.removeFromWishlist).mockResolvedValue({
        success: true,
      });

      render(
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('product-D22-2077-006')).toBeInTheDocument();

      const removeButton = screen.getByTestId('remove-D22-2077-006');
      await user.click(removeButton);

      await waitFor(() => {
        expect(
          screen.queryByTestId('product-D22-2077-006')
        ).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          'Produto removido da wishlist com sucesso'
        );
      });
    });
  });

  describe('Tratamento de erros', () => {
    it('deve exibir mensagem de erro quando falha ao carregar wishlist', async () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      vi.mocked(wishlistApi.getWishlist).mockRejectedValue(
        new Error('Network error')
      );

      render(
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(
          screen.getByText('Erro: Erro ao carregar produtos')
        ).toBeInTheDocument();
      });

      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();

      consoleErrorSpy.mockRestore();
    });

    it('deve exibir toast de erro quando remoção falha', async () => {
      const user = userEvent.setup();
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([mockProducts[0]]);
      const error = new Error('Failed to remove');
      vi.mocked(wishlistApi.removeFromWishlist).mockRejectedValue(error);

      render(
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
      });

      const removeButton = screen.getByTestId('remove-D22-2077-006');
      await user.click(removeButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Erro ao atualizar wishlist');
      });

      consoleErrorSpy.mockRestore();
    });
  });
});
