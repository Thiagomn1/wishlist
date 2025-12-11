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
  isWishlistPage,
}: ProductListProps) {
  return (
    <>
      <Breadcrumb />
      <div className="px-8 md:my-6 md:px-18 lg:px-28 xl:px-36">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,250px))] justify-center gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.code}
              product={product}
              onToggle={onToggle}
              isWishlisted={wishlistItems.some(
                (item) => item.code === product.code
              )}
              isWishlistPage={isWishlistPage}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
