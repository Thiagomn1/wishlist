import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import ProductCard from '../../components/ProductCard';
import type { Product } from '../../types';
import { mockProducts } from '../mocks/mockData';

const mockProduct = mockProducts[0];

describe('ProductCard', () => {
  describe('Conversão de preço', () => {
    it('deve converter e exibir preço cheio corretamente', () => {
      render(<ProductCard product={mockProduct} />);

      expect(screen.getByText('R$ 399.99')).toBeInTheDocument();
    });

    it('deve converter e exibir preço de promoção corretamente', () => {
      render(<ProductCard product={mockProduct} />);

      expect(screen.getByText('R$ 303.99')).toBeInTheDocument();
    });

    it('deve formatar preços com duas casas decimais', () => {
      const productWithRoundPrice: Product = {
        ...mockProduct,
        fullPriceInCents: '10000',
        salePriceInCents: '9999',
      };

      render(<ProductCard product={productWithRoundPrice} />);

      expect(screen.getByText('R$ 100.00')).toBeInTheDocument();
      expect(screen.getByText('R$ 99.99')).toBeInTheDocument();
    });

    it('deve lidar com preços menores que um real', () => {
      const productWithLowPrice: Product = {
        ...mockProduct,
        fullPriceInCents: '99',
        salePriceInCents: '50',
      };

      render(<ProductCard product={productWithLowPrice} />);

      expect(screen.getByText('R$ 0.99')).toBeInTheDocument();
      expect(screen.getByText('R$ 0.50')).toBeInTheDocument();
    });
  });

  describe('Renderização de estrelas', () => {
    it('deve renderizar 5 estrelas cheias para rating 5', () => {
      const product5Stars: Product = { ...mockProduct, rating: 5 };
      render(<ProductCard product={product5Stars} />);

      const wholeStars = screen.getAllByTestId('star-full');
      const halfStars = screen.queryAllByTestId('star-half');
      const emptyStars = screen.queryAllByTestId('star-empty');

      expect(wholeStars).toHaveLength(5);
      expect(halfStars).toHaveLength(0);
      expect(emptyStars).toHaveLength(0);
      expect(screen.getByText('5.0')).toBeInTheDocument();
    });

    it('deve renderizar 4 estrelas cheias e 1 vazia para rating 4', () => {
      const product4Stars: Product = { ...mockProduct, rating: 4 };
      render(<ProductCard product={product4Stars} />);

      const wholeStars = screen.getAllByTestId('star-full');
      const halfStars = screen.queryAllByTestId('star-half');
      const emptyStars = screen.getAllByTestId('star-empty');

      expect(wholeStars).toHaveLength(4);
      expect(halfStars).toHaveLength(0);
      expect(emptyStars).toHaveLength(1);
      expect(screen.getByText('4.0')).toBeInTheDocument();
    });

    it('deve renderizar meia estrela para rating 4.5', () => {
      const product4HalfStars: Product = { ...mockProduct, rating: 4.5 };
      render(<ProductCard product={product4HalfStars} />);

      const wholeStars = screen.getAllByTestId('star-full');
      const halfStars = screen.getAllByTestId('star-half');
      const emptyStars = screen.queryAllByTestId('star-empty');

      expect(wholeStars).toHaveLength(4);
      expect(halfStars).toHaveLength(1);
      expect(emptyStars).toHaveLength(0);
      expect(screen.getByText('4.5')).toBeInTheDocument();
    });

    it('deve renderizar 0 estrelas cheias para rating 0', () => {
      const product0Stars: Product = { ...mockProduct, rating: 0 };
      render(<ProductCard product={product0Stars} />);

      const wholeStars = screen.queryAllByTestId('star-full');
      const halfStars = screen.queryAllByTestId('star-half');
      const emptyStars = screen.getAllByTestId('star-empty');

      expect(wholeStars).toHaveLength(0);
      expect(halfStars).toHaveLength(0);
      expect(emptyStars).toHaveLength(5);
      expect(screen.getByText('0.0')).toBeInTheDocument();
    });
  });

  describe('Botão de wishlist', () => {
    it('deve renderizar botão de coração quando não é página de wishlist', () => {
      render(<ProductCard product={mockProduct} isWishlistPage={false} />);

      const button = screen.getByTestId('wishlist-button');
      const heartIcon = screen.getByTestId('icon-heart');

      expect(button).toBeInTheDocument();
      expect(heartIcon).toBeInTheDocument();
      expect(screen.queryByTestId('icon-x')).not.toBeInTheDocument();
      expect(screen.getByLabelText('Adicionar à Wishlist')).toBeInTheDocument();
    });

    it('deve renderizar botão X quando é página de wishlist', () => {
      render(<ProductCard product={mockProduct} isWishlistPage={true} />);

      const button = screen.getByTestId('wishlist-button');
      const xIcon = screen.getByTestId('icon-x');

      expect(button).toBeInTheDocument();
      expect(xIcon).toBeInTheDocument();
      expect(screen.queryByTestId('icon-heart')).not.toBeInTheDocument();
      expect(screen.getByLabelText('Remover da Wishlist')).toBeInTheDocument();
    });
  });

  describe('Callback onToggle', () => {
    it('deve chamar onToggle quando botão é clicado', async () => {
      const user = userEvent.setup();
      const mockOnToggle = vi.fn();

      render(<ProductCard product={mockProduct} onToggle={mockOnToggle} />);

      const button = screen.getByLabelText('Adicionar à Wishlist');
      await user.click(button);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onToggle com produto correto', async () => {
      const user = userEvent.setup();
      const mockOnToggle = vi.fn();

      render(<ProductCard product={mockProduct} onToggle={mockOnToggle} />);

      const button = screen.getByLabelText('Adicionar à Wishlist');
      await user.click(button);

      expect(mockOnToggle).toHaveBeenCalledWith(mockProduct);
    });

    it('não deve quebrar quando onToggle não é fornecido', async () => {
      const user = userEvent.setup();

      render(<ProductCard product={mockProduct} />);

      const button = screen.getByLabelText('Adicionar à Wishlist');

      await expect(user.click(button)).resolves.not.toThrow();
    });
  });

  describe('Renderização geral', () => {
    it('deve renderizar todos os elementos principais', () => {
      render(<ProductCard product={mockProduct} />);

      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('R$ 399.99')).toBeInTheDocument();
      expect(screen.getByText('R$ 303.99')).toBeInTheDocument();
      expect(screen.getByLabelText('Adicionar à Wishlist')).toBeInTheDocument();
    });
  });
});
