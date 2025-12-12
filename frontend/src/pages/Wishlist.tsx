import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { wishlistApi } from '../services/api';
import type { Product } from '../types';
import ProductList from '../components/ProductList';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const wishlistData = await wishlistApi.getWishlist();
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

  const handleRemoveFromWishlist = async (product: Product) => {
    try {
      await wishlistApi.removeFromWishlist(product.code);
      setWishlistItems((prev) => prev.filter((p) => p.code !== product.code));

      toast.success('Produto removido da wishlist com sucesso');
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
      products={wishlistItems}
      onToggle={handleRemoveFromWishlist}
      wishlistItems={wishlistItems}
      isWishlistPage
    />
  );
}

export default Wishlist;
