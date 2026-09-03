import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-5">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">
            Order not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            We couldn't find the order details.
          </p>

          <button
            onClick={() => navigate("/marketplace")}
            className="mt-5 rounded-xl bg-[#6d28d9] px-5 py-3 text-sm font-bold text-white"
          >
            Go to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const product = order.product;
  const plan = order.plan;
  const variant = order.variant;

  return (
    <div className="min-h-screen bg-[#f7f7f8] px-4 py-8">
      <main className="mx-auto max-w-2xl">

        <div className="rounded-[28px] bg-white p-6 text-center shadow-sm sm:p-8">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2
              size={52}
              className="text-green-500"
            />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Order Confirmed!
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Your EMI purchase has been successfully placed.
          </p>

          <div className="mt-6 rounded-2xl bg-[#f7f7f8] p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Order ID
            </p>

            <p className="mt-2 break-all font-semibold text-gray-900">
              {order._id}
            </p>
          </div>
        </div>

        <section className="mt-5 rounded-[28px] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 p-3 text-[#6d28d9]">
              <Package size={22} />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#6d28d9]">
                {order.productName}
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Purchase details
              </h2>
            </div>
          </div>

          {variant && (
            <div className="mt-5 flex justify-between border-b border-gray-100 pb-4 text-sm">
              <span className="text-gray-500">
                Variant
              </span>

              <span className="font-semibold">
                {variant.name}: {variant.value}
              </span>
            </div>
          )}

          <div className="mt-4 flex justify-between border-b border-gray-100 pb-4 text-sm">
            <span className="text-gray-500">
              Product price
            </span>

            <span className="font-semibold">
              ₹{Number(order.productPrice).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="mt-4 rounded-2xl bg-purple-50 p-5">

            <p className="text-xs font-semibold uppercase tracking-wide text-[#6d28d9]">
              EMI Plan
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              ₹{Number(plan.monthlyAmount).toLocaleString("en-IN")}
              <span className="ml-1 text-sm font-normal text-gray-500">
                / month
              </span>
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {plan.tenure} months • {plan.interestRate}% interest
            </p>

            {plan.cashback > 0 && (
              <p className="mt-3 text-sm font-semibold text-green-600">
                ₹{Number(plan.cashback).toLocaleString("en-IN")} cashback
              </p>
            )}

          </div>

          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500">
              Order status
            </span>

            <span className="rounded-full bg-yellow-50 px-3 py-1 font-semibold capitalize text-yellow-700">
              {order.status}
            </span>
          </div>

        </section>

        <button
          onClick={() => navigate("/orders")}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6d28d9] py-4 text-sm font-bold text-white transition hover:bg-[#5b21b6]"
        >
          View My Orders
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => navigate("/marketplace")}
          className="mt-3 w-full rounded-2xl py-3 text-sm font-semibold text-gray-500"
        >
          Continue Shopping
        </button>

      </main>
    </div>
  );
};

export default OrderSuccess;