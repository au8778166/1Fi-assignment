import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../services/api";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrderById(id);

        setOrder(data?.order || data);
      } catch (err) {
        console.error("Failed to load order:", err);
        setError("Unable to load this order.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadOrder();
    }
  }, [id]);

  const formatPrice = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8]">
        <p className="text-gray-500">Loading order...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-5">
        <div className="text-center">
          <Package
            size={48}
            className="mx-auto text-[#6d28d9]"
          />

          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Order not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error || "This order does not exist."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="mt-5 rounded-xl bg-[#6d28d9] px-5 py-3 text-sm font-bold text-white"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] pb-10">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="rounded-full bg-gray-100 p-2 text-gray-700"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Order Details
            </h1>

            <p className="text-xs text-gray-500">
              View your EMI purchase
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <section className="rounded-[28px] bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2
              size={48}
              className="text-green-500"
            />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Order Confirmed
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your EMI purchase has been successfully placed.
          </p>

          <div className="mt-5 rounded-2xl bg-[#f7f7f8] p-4 text-left">
            <p className="text-xs text-gray-400">
              ORDER ID
            </p>

            <p className="mt-1 break-all text-sm font-semibold text-gray-800">
              {order._id}
            </p>
          </div>
        </section>

        <section className="mt-5 rounded-[28px] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 p-3">
              <Package
                size={24}
                className="text-[#6d28d9]"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#6d28d9]">
                EMI PURCHASE
              </p>

              <h2 className="text-xl font-bold text-gray-900">
                {order.productName}
              </h2>
            </div>
          </div>

          {order.variant && (
            <div className="mt-6 flex justify-between border-b border-gray-100 pb-4">
              <span className="text-sm text-gray-500">
                {order.variant.name}
              </span>

              <span className="text-sm font-semibold text-gray-900">
                {order.variant.value}
              </span>
            </div>
          )}

          <div className="mt-4 flex justify-between border-b border-gray-100 pb-4">
            <span className="text-sm text-gray-500">
              Product price
            </span>

            <span className="font-bold text-gray-900">
              {formatPrice(order.productPrice)}
            </span>
          </div>

          <div className="mt-5 rounded-2xl bg-purple-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6d28d9]">
              EMI PLAN
            </p>

            <p className="mt-3 text-2xl font-bold text-gray-900">
              {formatPrice(order.plan?.monthlyAmount)}
              <span className="ml-1 text-sm font-normal text-gray-500">
                / month
              </span>
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {order.plan?.tenure} months •{" "}
              {order.plan?.interestRate}% interest
            </p>

            {order.plan?.cashback > 0 && (
              <p className="mt-3 text-sm font-semibold text-green-600">
                {formatPrice(order.plan.cashback)} cashback
              </p>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#f7f7f8] p-4">
              <p className="text-xs text-gray-400">
                Monthly EMI
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {formatPrice(order.plan?.monthlyAmount)}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f7f8] p-4">
              <p className="text-xs text-gray-400">
                Tenure
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {order.plan?.tenure} months
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f7f8] p-4">
              <p className="text-xs text-gray-400">
                Interest
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {order.plan?.interestRate}%
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f7f8] p-4">
              <p className="text-xs text-gray-400">
                Status
              </p>

              <p className="mt-1 font-bold capitalize text-yellow-600">
                {order.status || "pending"}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 flex gap-3 rounded-2xl bg-white p-5 shadow-sm">
          <ShieldCheck
            size={22}
            className="shrink-0 text-green-600"
          />

          <p className="text-xs leading-5 text-gray-500">
            Your EMI purchase has been recorded successfully.
            Keep your Order ID for future reference.
          </p>
        </section>

        <button
          type="button"
          onClick={() => navigate("/orders")}
          className="mt-5 w-full rounded-2xl bg-[#6d28d9] py-4 text-sm font-bold text-white"
        >
          Back to My Orders
        </button>

        <button
          type="button"
          onClick={() => navigate("/marketplace")}
          className="mt-3 w-full rounded-2xl py-3 text-sm font-semibold text-gray-500"
        >
          Continue Shopping
        </button>
      </main>
    </div>
  );
};

export default OrderDetails;