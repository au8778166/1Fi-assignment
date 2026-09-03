import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const image = product?.images?.[0];

  const discount =
    product?.mrp && product?.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const handleViewProduct = () => {
    navigate(`/marketplace/${product.slug}`);
  };

  return (
    <article className="overflow-hidden rounded-[28px] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative m-3 h-[250px] overflow-hidden rounded-[22px] bg-gray-100">
        {discount > 0 && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1 text-xs font-bold text-green-600 shadow-sm">
            {discount}% OFF
          </div>
        )}

        {!imageError && image ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="text-5xl">📱</div>
              <p className="mt-2 text-sm font-medium text-gray-400">
                Product image
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        <p className="text-sm font-semibold text-[#6d28d9]">
          {product.brand}
        </p>

        <h3 className="mt-1 line-clamp-2 text-xl font-bold text-gray-900">
          {product.name}
        </h3>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price?.toLocaleString("en-IN")}
          </span>

          {product.mrp && (
            <span className="mb-1 text-sm text-gray-400 line-through">
              ₹{product.mrp?.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-400">
          EMI details available on product page
        </p>

        <button
          type="button"
          onClick={handleViewProduct}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d28d9] px-4 py-3 font-semibold text-white transition hover:bg-[#5b21b6]"
        >
          View product
          <ArrowRight size={18} />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;