import { useState, useEffect } from 'react';
import { productsApi } from '../services/api';
import type { Product } from '../types';

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getProducts();
        console.log('Dados recebidos:', data);
        setProducts(data.products);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="mx-24 py-6">Carregando...</div>;
  if (error) return <div className="mx-24 py-6">Erro: {error}</div>;

  return (
    <div className="mx-24">
      <h4 className="text-purple-dark my-6 font-bold">Home</h4>
      <hr />
      {products.map((product) => (
        <div key={product.code}>
          {product.name} - R$ {product.salePriceInCents}
        </div>
      ))}
    </div>
  );
}
export default Home;
