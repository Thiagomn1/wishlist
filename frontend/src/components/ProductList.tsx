import type { Product } from '../types';
import Breadcrumb from './Breadcrumb';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onToggle: (product: Product) => void;
  wishlistItems: Product[];
  isWishlistPage?: boolean;
}

function ProductList({
  products,
  onToggle,
  wishlistItems,
  isWishlistPage = false,
}: ProductListProps) {
  return (
    <>
      <Breadcrumb />
      <div className="px-8 md:my-6 md:px-18 lg:px-28 xl:px-36">
        <div
          className="grid grid-cols-[repeat(auto-fit,250px)] justify-center gap-6"
          role="list"
          aria-label="Lista de produtos"
        >
          {products.map((product) => (
            <div key={product.code} role="listitem">
              <ProductCard
                product={product}
                onToggle={onToggle}
                isWishlisted={wishlistItems.some(
                  (item) => item.code === product.code
                )}
                isWishlistPage={isWishlistPage}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
