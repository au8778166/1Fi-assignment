const VariantSelector = ({ variants, selectedVariant, onSelect }) => {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-gray-900">
        Choose variant
      </h3>

      <div className="flex flex-wrap gap-2">
        {variants.map((variant, index) => {
          const isSelected =
            selectedVariant?.value === variant.value &&
            selectedVariant?.name === variant.name;

          return (
            <button
              key={`${variant.name}-${variant.value}-${index}`}
              onClick={() => onSelect(variant)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                isSelected
                  ? "border-[#6d28d9] bg-purple-50 text-[#6d28d9]"
                  : "border-gray-200 bg-white text-gray-700 hover:border-purple-300"
              }`}
            >
              {variant.value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VariantSelector;