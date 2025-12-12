import { useState, useEffect } from 'react';
import { productsApi, wishlistApi } from '../services/api';
import type { Product } from '../types';
import { toast } from 'react-toastify';
import ProductList from '../components/ProductList';

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, wishlistData] = await Promise.all([
          productsApi.getProducts(),
          wishlistApi.getWishlist(),
        ]);

        const filteredProdcuts = productsData.products.filter(
          (product: Product) =>
            product.available && product.stockAvailable && product.visible
        );

        setProducts(filteredProdcuts);
        setWishlistItems(wishlistData);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleWishlist = async (product: Product) => {
    const isWishlisted = wishlistItems.some(
      (item) => item.code === product.code
    );

    try {
      if (isWishlisted) {
        await wishlistApi.removeFromWishlist(product.code);

        setWishlistItems((prev) => prev.filter((p) => p.code !== product.code));

        toast.success('Produto removido da wishlist com sucesso');
      } else {
        await wishlistApi.addToWishlist(product);

        setWishlistItems((prev) => [...prev, product]);

        toast.success('Produto adicionado à wishlist com sucesso');
      }
    } catch (err) {
      console.error('Erro ao atualizar wishlist:', err);
      toast.error('Erro ao atualizar wishlist');
    }
  };

  if (loading)
    return (
      <div
        data-testid="loading"
        className="flex h-screen items-center justify-center"
        role="status"
        aria-label="Carregando produtos"
      >
        <span className="loader" aria-hidden="true"></span>
        <span className="sr-only">Carregando...</span>
      </div>
    );
  if (error) return <div role="alert">Erro: {error}</div>;

  return (
    <ProductList
      products={products}
      onToggle={handleToggleWishlist}
      wishlistItems={wishlistItems}
      isWishlistPage={false}
    />
  );
}
export default Home;
