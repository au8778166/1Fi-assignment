import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const order = location.state;

  if (!order?.product || !order?.plan) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-5">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">
            No order selected
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please select a product and EMI plan first.
          </p>

          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            className="mt-5 rounded-xl bg-[#6d28d9] px-5 py-3 text-sm font-bold text-white"
          >
            Go to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const { product, variant, plan } = order;

  const productPrice = Number(product.price || 0);
  const monthlyAmount = Number(plan.monthlyAmount || 0);
  const tenure = Number(plan.tenure || 0);
  const cashback = Number(plan.cashback || 0);
  const interestRate = Number(plan.interestRate || 0);

  const totalAmount = monthlyAmount * tenure;

  const handleConfirm = async () => {
  try {
    const response = await createOrder({
      product: product._id,
      productName: product.name,
      variant,
      plan,
      productPrice: product.price,
      totalAmount: plan.monthlyAmount * plan.tenure,
    });

    if (response?.success) {
      navigate("/order-success", {
        state: {
          order: response.order,
        },
      });
    }
  } catch (error) {
    console.error(error);
    alert("Unable to create order. Please try again.");
  }
};

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-5">
        <div className="w-full max-w-md rounded-[32px] bg-white p-7 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2
              size={48}
              className="text-green-600"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Purchase confirmed!
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Your EMI purchase has been successfully created.
          </p>

          {orderId && (
            <div className="mt-5 rounded-2xl bg-[#f7f7f8] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Order ID
              </p>

              <p className="mt-2 break-all text-sm font-bold text-gray-900">
                {orderId}
              </p>
            </div>
          )}

          <div className="mt-5 rounded-2xl bg-purple-50 p-4 text-left">
            <p className="text-xs font-semibold text-[#6d28d9]">
              {product.brand}
            </p>

            <p className="mt-1 font-bold text-gray-900">
              {product.name}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              ₹{monthlyAmount.toLocaleString("en-IN")} ×{" "}
              {tenure} months
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            className="mt-6 w-full rounded-2xl bg-[#6d28d9] py-4 text-sm font-bold text-white transition hover:bg-[#5b21b6]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] pb-10">
      <header className="border-b border-gray-100 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full bg-gray-100 p-2"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-lg font-bold text-gray-900">
            Confirm purchase
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="rounded-[28px] bg-purple-50 p-6 text-center">
          <CheckCircle2
            size={48}
            className="mx-auto text-[#6d28d9]"
          />

          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            Your EMI plan is ready
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Review your product and selected EMI plan before
            continuing.
          </p>
        </div>

        <section className="mt-5 rounded-[28px] bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">
            Product
          </h3>

          <div className="mt-4 flex gap-4">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-50">
              <img
                src={variant?.image || product.images?.[0]}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#6d28d9]">
                {product.brand}
              </p>

              <h2 className="mt-1 font-bold text-gray-900">
                {product.name}
              </h2>

              {variant && (
                <p className="mt-1 text-sm text-gray-500">
                  {variant.name}: {variant.value}
                </p>
              )}

              <p className="mt-2 font-bold text-gray-900">
                ₹{productPrice.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">
              Selected EMI
            </h3>

            {interestRate === 0 && (
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                No-cost EMI
              </span>
            )}
          </div>

          <div className="mt-4 rounded-2xl bg-[#f7f7f8] p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  ₹{monthlyAmount.toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  per month
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-[#6d28d9]">
                  {tenure} months
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {interestRate}% interest
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Monthly EMI
                </span>

                <span className="font-semibold">
                  ₹{monthlyAmount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Tenure
                </span>

                <span className="font-semibold">
                  {tenure} months
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Total EMI amount
                </span>

                <span className="font-semibold">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>

              {cashback > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Cashback
                  </span>

                  <span className="font-semibold text-green-600">
                    ₹{cashback.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="mt-4 flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
          <ShieldCheck
            size={21}
            className="shrink-0 text-green-600"
          />

          <p className="text-xs leading-5 text-gray-500">
            This purchase is backed by your mutual fund
            investments. Your selected EMI details will be
            reviewed before the final purchase.
          </p>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={processing}
          className="mt-5 w-full rounded-2xl bg-[#6d28d9] py-4 text-sm font-bold text-white transition hover:bg-[#5b21b6] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {processing
            ? "Processing..."
            : "Confirm & continue"}
        </button>

        <button
          type="button"
          disabled={processing}
          onClick={() => navigate(-1)}
          className="mt-3 w-full rounded-2xl py-3 text-sm font-semibold text-gray-500"
        >
          Change EMI plan
        </button>
      </main>
    </div>
  );
};

export default Checkout;