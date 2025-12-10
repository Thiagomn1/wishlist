import { useState, useEffect } from 'react';
import { productsApi, wishlistApi } from '../services/api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

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
        setProducts(productsData.products);
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
    const isWishlisted = wishlistItems.includes(product);

    try {
      if (isWishlisted) {
        await wishlistApi.removeFromWishlist(product.code);
        setWishlistItems((prev) => prev.filter((p) => p !== product));
      } else {
        await wishlistApi.addToWishlist(product);
        setWishlistItems((prev) => [...prev, product]);
      }
    } catch (err) {
      console.error('Erro ao atualizar wishlist:', err);
    }
  };

  if (loading) return <div className="mx-24 py-6">Carregando...</div>;
  if (error) return <div className="mx-24 py-6">Erro: {error}</div>;

  return (
    <>
      <div className="md:mx-24">
        <h4 className="text-purple-dark my-2 ml-4 font-bold md:my-6 md:ml-0">
          Home
        </h4>
        <hr className="hidden md:block" />
      </div>

      <div className="my-6 flex w-full flex-wrap justify-center gap-6 px-4 sm:px-6 md:px-8 lg:px-12">
        {products.map((product) => (
          <ProductCard
            key={product.code}
            product={product}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistItems.includes(product)}
          />
        ))}
      </div>
    </>
  );
}
export default Home;
