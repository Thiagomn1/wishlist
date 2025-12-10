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
    const isWishlisted = wishlistItems.some(
      (item) => item.code === product.code
    );

    try {
      if (isWishlisted) {
        await wishlistApi.removeFromWishlist(product.code);
        setWishlistItems((prev) => prev.filter((p) => p.code !== product.code));
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

      <div className="mx-auto my-6 w-full px-4 sm:px-6 md:px-8 lg:px-36">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-center gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.code}
              product={product}
              onToggle={handleToggleWishlist}
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
export default Home;
