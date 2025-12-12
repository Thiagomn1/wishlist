import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import Home from '../../pages/Home';
import { productsApi, wishlistApi } from '../../services/api';
import { mockProducts, mockWishlistItems } from '../mocks/mockData';
import { toast } from 'react-toastify';

vi.mock('../../services/api', () => ({
  productsApi: {
    getProducts: vi.fn(),
  },
  wishlistApi: {
    getWishlist: vi.fn(),
    addToWishlist: vi.fn(),
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
    isWishlisted,
  }: {
    product: { code: string; name: string };
    onToggle: (product: { code: string; name: string }) => void;
    isWishlisted: boolean;
  }) => (
    <div data-testid={`product-${product.code}`}>
      <h3>{product.name}</h3>
      <button
        onClick={() => onToggle(product)}
        data-testid={`toggle-${product.code}`}
      >
        {isWishlisted ? 'Remover' : 'Adicionar'}
      </button>
    </div>
  ),
}));

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Carregamento inicial', () => {
    it('deve exibir estado de carregamento inicialmente', () => {
      vi.mocked(productsApi.getProducts).mockImplementation(
        () => new Promise(() => {})
      );
      vi.mocked(wishlistApi.getWishlist).mockImplementation(
        () => new Promise(() => {})
      );

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
  });

  describe('Exibição de produtos após fetch', () => {
    it('deve carregar e exibir produtos com sucesso', async () => {
      vi.mocked(productsApi.getProducts).mockResolvedValue({
        products: mockProducts,
      });
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue(mockWishlistItems);

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });

      expect(
        screen.getByText('Tênis Nike Revolution 7 Feminino - Preto+Branco')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Bola de Futebol Society Penalty 8 X - Branco+Verde Limão'
        )
      ).toBeInTheDocument();
    });

    it('deve renderizar lista vazia quando não há produtos', async () => {
      vi.mocked(productsApi.getProducts).mockResolvedValue({
        products: [],
      });
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([]);

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });

      expect(screen.queryByTestId(/product-/)).not.toBeInTheDocument();
    });

    it('deve renderizar breadcrumb após carregamento', async () => {
      vi.mocked(productsApi.getProducts).mockResolvedValue({
        products: mockProducts,
      });
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([]);

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
      });
    });
  });

  describe('Wishlist', () => {
    it('deve marcar produtos como wishlisted corretamente', async () => {
      vi.mocked(productsApi.getProducts).mockResolvedValue({
        products: mockProducts,
      });
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([mockProducts[0]]);

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });

      const firstProductButton = screen.getByTestId('toggle-D22-2077-006');
      expect(firstProductButton).toHaveTextContent('Remover');

      const secondProductButton = screen.getByTestId('toggle-NQQ-4378-028');
      expect(secondProductButton).toHaveTextContent('Adicionar');
    });

    it('deve adicionar produto à wishlist ao clicar no botão', async () => {
      const user = userEvent.setup();

      vi.mocked(productsApi.getProducts).mockResolvedValue({
        products: mockProducts,
      });
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([]);
      vi.mocked(wishlistApi.addToWishlist).mockResolvedValue({
        success: true,
      });

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });

      const toggleButton = screen.getByTestId('toggle-D22-2077-006');
      expect(toggleButton).toHaveTextContent('Adicionar');

      await user.click(toggleButton);

      await waitFor(() => {
        expect(wishlistApi.addToWishlist).toHaveBeenCalledWith(mockProducts[0]);
      });

      await waitFor(() => {
        expect(toggleButton).toHaveTextContent('Remover');
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          'Produto adicionado à wishlist com sucesso'
        );
      });
    });

    it('deve remover produto da wishlist ao clicar no botão', async () => {
      const user = userEvent.setup();

      vi.mocked(productsApi.getProducts).mockResolvedValue({
        products: mockProducts,
      });
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([mockProducts[0]]);
      vi.mocked(wishlistApi.removeFromWishlist).mockResolvedValue({
        success: true,
      });

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });

      const toggleButton = screen.getByTestId('toggle-D22-2077-006');
      expect(toggleButton).toHaveTextContent('Remover');

      await user.click(toggleButton);

      await waitFor(() => {
        expect(wishlistApi.removeFromWishlist).toHaveBeenCalledWith(
          'D22-2077-006'
        );
      });

      await waitFor(() => {
        expect(toggleButton).toHaveTextContent('Adicionar');
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          'Produto removido da wishlist com sucesso'
        );
      });
    });
  });

  describe('Tratamento de erros', () => {
    it('deve exibir mensagem de erro quando falha ao carregar produtos', async () => {
      vi.mocked(productsApi.getProducts).mockRejectedValue(
        new Error('Network error')
      );
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([]);

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(
          screen.getByText('Erro: Erro ao carregar produtos')
        ).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });
    });

    it('deve exibir mensagem de erro quando falha ao carregar wishlist', async () => {
      vi.mocked(productsApi.getProducts).mockResolvedValue({
        products: mockProducts,
      });
      vi.mocked(wishlistApi.getWishlist).mockRejectedValue(
        new Error('Network error')
      );

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(
          screen.getByText('Erro: Erro ao carregar produtos')
        ).toBeInTheDocument();
      });
    });

    it('deve exibir toast de erro ao falhar em adicionar produto à wishlist', async () => {
      const user = userEvent.setup();

      vi.mocked(productsApi.getProducts).mockResolvedValue({
        products: mockProducts,
      });
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([]);
      const error = new Error('Failed to add');
      vi.mocked(wishlistApi.addToWishlist).mockRejectedValue(error);

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });

      const toggleButton = screen.getByTestId('toggle-D22-2077-006');
      await user.click(toggleButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Erro ao atualizar wishlist');
      });
    });

    it('deve exibir toast de erro ao falhar em remover produto da wishlist', async () => {
      const user = userEvent.setup();

      vi.mocked(productsApi.getProducts).mockResolvedValue({
        products: mockProducts,
      });
      vi.mocked(wishlistApi.getWishlist).mockResolvedValue([mockProducts[0]]);
      const error = new Error('Failed to remove');
      vi.mocked(wishlistApi.removeFromWishlist).mockRejectedValue(error);

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });

      const toggleButton = screen.getByTestId('toggle-D22-2077-006');
      await user.click(toggleButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Erro ao atualizar wishlist');
      });
    });
  });
});
