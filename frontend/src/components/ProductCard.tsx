import { CiHeart } from 'react-icons/ci';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { LuX } from 'react-icons/lu';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onToggle?: (productCode: Product) => void;
  isWishlisted?: boolean;
  isWishlistPage?: boolean;
}

export default function ProductCard({
  product,
  onToggle,
  isWishlisted = false,
  isWishlistPage = false,
}: ProductCardProps) {
  const fullPrice = Number(product.fullPriceInCents) / 100;
  const salePrice = Number(product.salePriceInCents) / 100;

  const renderRating = (rating: number) => {
    const stars = [];
    const wholeStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - wholeStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < wholeStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
    }

    return stars;
  };

  return (
    <div className="relative max-w-[250px] cursor-pointer rounded-md border border-gray-200 bg-white p-3 shadow-[4px_3px_8px_rgba(0,0,0,0.5)] transition-all hover:scale-[1.01]">
      {isWishlistPage ? (
        <button
          aria-label="Adicionar à Wishlist"
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.(product);
          }}
          className="absolute top-2 right-2 cursor-pointer rounded-full p-1 transition hover:scale-110"
        >
          <LuX size={26} className="text-gray-800" />
        </button>
      ) : (
        <button
          aria-label="Adicionar à Wishlist"
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.(product);
          }}
          className={`${isWishlisted ? 'bg-red-500' : 'bg-gray-500'} absolute top-2 right-2 cursor-pointer rounded-full p-1 shadow-md transition hover:scale-110`}
        >
          <CiHeart size={26} className="text-white" />
        </button>
      )}

      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full rounded-lg object-cover"
      />

      <p className="mt-3 line-clamp-2 text-sm font-medium text-gray-600">
        {product.name}
      </p>

      <div className="mt-1 flex items-center gap-1 text-sm">
        {renderRating(product.rating)}
        <span className="ml-1 text-xs text-gray-700">
          {product.rating.toFixed(1)}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-400 line-through">
        R$ {fullPrice.toFixed(2)}
      </p>

      <p className="text-purple-dark text-lg font-bold">
        R$ {salePrice.toFixed(2)}
      </p>
    </div>
  );
}
