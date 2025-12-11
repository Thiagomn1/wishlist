import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import axios from 'axios';
import { mockProducts } from '../mocks/mockData';

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

describe('API Services', () => {
  let mockGet: Mock;
  let mockPost: Mock;
  let mockDelete: Mock;
  let productsApi: typeof import('../../services/api').productsApi;
  let wishlistApi: typeof import('../../services/api').wishlistApi;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();

    mockGet = vi.fn();
    mockPost = vi.fn();
    mockDelete = vi.fn();

    mockedAxios.create = vi.fn().mockReturnValue({
      get: mockGet,
      post: mockPost,
      delete: mockDelete,
    });

    const module = await import('../../services/api');
    productsApi = module.productsApi;
    wishlistApi = module.wishlistApi;
  });

  describe('productsApi', () => {
    describe('getProducts', () => {
      it('deve fazer requisição GET para /products', async () => {
        const mockResponse = {
          data: { products: mockProducts },
        };

        mockGet.mockResolvedValue(mockResponse);

        await productsApi.getProducts();

        expect(mockGet).toHaveBeenCalledWith('/products');
        expect(mockGet).toHaveBeenCalledTimes(1);
      });

      it('deve retornar dados de produtos com sucesso', async () => {
        const mockResponse = {
          data: { products: mockProducts },
        };

        mockGet.mockResolvedValue(mockResponse);

        const result = await productsApi.getProducts();

        expect(result).toEqual({ products: mockProducts });
      });

      it('deve retornar array vazio de produtos quando não há produtos', async () => {
        const mockResponse = {
          data: { products: [] },
        };

        mockGet.mockResolvedValue(mockResponse);

        const result = await productsApi.getProducts();

        expect(result).toEqual({ products: [] });
      });
    });
  });

  describe('wishlistApi', () => {
    describe('getWishlist', () => {
      it('deve fazer requisição GET para /wishlist', async () => {
        const mockResponse = {
          data: [mockProducts[0]],
        };

        mockGet.mockResolvedValue(mockResponse);

        await wishlistApi.getWishlist();

        expect(mockGet).toHaveBeenCalledWith('/wishlist');
        expect(mockGet).toHaveBeenCalledTimes(1);
      });

      it('deve retornar lista de produtos da wishlist', async () => {
        const mockResponse = {
          data: [mockProducts[0]],
        };

        mockGet.mockResolvedValue(mockResponse);

        const result = await wishlistApi.getWishlist();

        expect(result).toEqual([mockProducts[0]]);
      });

      it('deve retornar array vazio quando wishlist estiver vazia', async () => {
        const mockResponse = {
          data: [],
        };

        mockGet.mockResolvedValue(mockResponse);

        const result = await wishlistApi.getWishlist();

        expect(result).toEqual([]);
      });
    });

    describe('addToWishlist', () => {
      it('deve fazer requisição POST para /wishlist com produto', async () => {
        const product = mockProducts[0];
        const mockResponse = {
          data: { success: true },
        };

        mockPost.mockResolvedValue(mockResponse);

        await wishlistApi.addToWishlist(product);

        expect(mockPost).toHaveBeenCalledWith('/wishlist', { product });
        expect(mockPost).toHaveBeenCalledTimes(1);
      });

      it('deve retornar produto adicionado quando API retorna produto', async () => {
        const product = mockProducts[0];
        const mockResponse = {
          data: product,
        };

        mockPost.mockResolvedValue(mockResponse);

        const result = await wishlistApi.addToWishlist(product);

        expect(result).toEqual(product);
      });
    });

    describe('removeFromWishlist', () => {
      it('deve fazer requisição DELETE para /wishlist/:code', async () => {
        const productCode = 'D22-2077-006';
        const mockResponse = {
          data: { success: true },
        };

        mockDelete.mockResolvedValue(mockResponse);

        await wishlistApi.removeFromWishlist(productCode);

        expect(mockDelete).toHaveBeenCalledWith(`/wishlist/${productCode}`);
        expect(mockDelete).toHaveBeenCalledTimes(1);
      });

      it('deve usar código do produto na URL corretamente', async () => {
        const productCode = 'D22-2077-006';
        const mockResponse = {
          data: { success: true },
        };

        mockDelete.mockResolvedValue(mockResponse);

        await wishlistApi.removeFromWishlist(productCode);

        expect(mockDelete).toHaveBeenCalledWith(`/wishlist/${productCode}`);

        const callArgs = mockDelete.mock.calls[0];
        expect(callArgs[0]).toBe(`/wishlist/${productCode}`);
      });

      it('deve retornar produto removido quando API retorna produto', async () => {
        const productCode = 'D22-2077-006';
        const mockResponse = {
          data: { message: 'Item removido da lista de desejos com sucesso.' },
        };

        mockDelete.mockResolvedValue(mockResponse);

        const result = await wishlistApi.removeFromWishlist(productCode);

        expect(result).toEqual({
          message: 'Item removido da lista de desejos com sucesso.',
        });
      });
    });
  });

  describe('Configuração da API', () => {
    it('deve criar instância do axios com baseURL correta', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: 'http://localhost:3001/api',
        })
      );
    });

    it('deve configurar header Content-Type como application/json', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });
  });
});
