import { useEffect, useState } from "react";
import { ArrowLeft, CreditCard, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductBySlug } from "../services/api";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductBySlug(slug);
        const productData = data?.product || data;

        setProduct(productData);

        if (productData?.variants?.length > 0) {
          setSelectedVariant(productData.variants[0]);
        }

        setSelectedPlanIndex(0);
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const handleCheckout = () => {
    if (!product) {
      alert("Product not found.");
      return;
    }

    if (!product.emiPlans?.length) {
      alert("No EMI plans available for this product.");
      return;
    }

    const selectedPlan = product.emiPlans[selectedPlanIndex];

    if (!selectedPlan) {
      alert("Please select an EMI plan.");
      return;
    }

    navigate("/checkout", {
      state: {
        product,
        variant: selectedVariant,
        plan: selectedPlan,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8]">
        <div className="text-gray-500">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f7f8]">
        <h2 className="text-xl font-bold text-gray-900">
          Product not found
        </h2>

        <button
          type="button"
          onClick={() => navigate("/marketplace")}
          className="mt-5 rounded-xl bg-[#6d28d9] px-5 py-3 font-semibold text-white"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  const image = product.images?.[0];

  return (
    <div className="min-h-screen bg-[#f7f7f8] pb-10">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/marketplace")}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-700"
        >
          <ArrowLeft size={20} />
          Product details
        </button>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-[28px] bg-white p-5">
              {image ? (
                <img
                  src={image}
                  alt={product.name}
                  className="h-[420px] w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-[420px] items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                  No image available
                </div>
              )}
            </div>

            <div className="mt-5 rounded-[28px] bg-white p-6">
              <p className="font-semibold text-[#6d28d9]">
                {product.brand}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              <p className="mt-4 text-gray-500">
                {product.description ||
                  "Premium product available on EMI."}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{product.price?.toLocaleString("en-IN")}
                </span>

                {product.mrp && (
                  <span className="text-gray-400 line-through">
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {product.variants?.length > 0 && (
                <div className="mt-7">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    Choose variant
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, index) => {
                      const active =
                        selectedVariant === variant ||
                        selectedVariant?.value === variant.value;

                      return (
                        <button
                          type="button"
                          key={`${variant.name}-${variant.value}-${index}`}
                          onClick={() =>
                            setSelectedVariant(variant)
                          }
                          className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                            active
                              ? "border-[#6d28d9] bg-purple-50 text-[#6d28d9]"
                              : "border-gray-200 bg-white text-gray-600 hover:border-purple-300"
                          }`}
                        >
                          {variant.value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-50 p-3 text-[#6d28d9]">
                <CreditCard size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Choose your EMI
                </h2>

                <p className="text-sm text-gray-500">
                  Select a plan that works best for you.
                </p>
              </div>
            </div>

            {product.emiPlans?.length > 0 ? (
              <div className="space-y-4">
                {product.emiPlans.map((plan, index) => {
                  const active = selectedPlanIndex === index;

                  return (
                    <button
                      type="button"
                      key={plan._id || index}
                      onClick={() =>
                        setSelectedPlanIndex(index)
                      }
                      className={`w-full rounded-2xl border p-5 text-left transition ${
                        active
                          ? "border-[#7c3aed] bg-purple-50"
                          : "border-gray-200 bg-white hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xl font-bold text-gray-900">
                            ₹
                            {plan.monthlyAmount?.toLocaleString(
                              "en-IN"
                            )}

                            <span className="ml-1 text-sm font-normal text-gray-500">
                              / month
                            </span>
                          </p>

                          <p className="mt-2 text-sm text-gray-500">
                            {plan.tenure} months •{" "}
                            {plan.interestRate}% interest
                          </p>

                          {plan.cashback > 0 && (
                            <p className="mt-3 text-sm font-semibold text-green-600">
                              ₹
                              {plan.cashback.toLocaleString(
                                "en-IN"
                              )}{" "}
                              cashback
                            </p>
                          )}

                          {plan.interestRate === 0 && (
                            <span className="mt-3 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                              No-cost EMI
                            </span>
                          )}
                        </div>

                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                            active
                              ? "border-[#6d28d9] bg-[#6d28d9] text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {active && <Check size={15} />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl bg-gray-50 p-6 text-center">
                <p className="font-semibold text-gray-900">
                  No EMI plans available
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  This product currently has no EMI options.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={!product.emiPlans?.length}
              className="mt-6 w-full rounded-2xl bg-[#6d28d9] py-4 font-bold text-white transition hover:bg-[#5b21b6] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;