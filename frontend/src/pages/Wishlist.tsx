import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { wishlistApi } from '../services/api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';

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

  if (loading) return <div className="mx-24 py-6">Carregando...</div>;
  if (error) return <div className="mx-24 py-6">Erro: {error}</div>;

  return (
    <>
      <Breadcrumb />

      <div className="mx-auto my-6 w-full px-4 sm:px-6 md:px-8 lg:px-36">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-center gap-6">
          {wishlistItems.map((product) => (
            <ProductCard
              isWishlistPage
              key={product.code}
              product={product}
              onToggle={handleRemoveFromWishlist}
              isWishlisted={wishlistItems.some(
                (item) => item.code === product.code
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
