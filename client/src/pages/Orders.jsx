import { useEffect, useState } from "react";
import { ArrowLeft, Package, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/api";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();

        const orderList = Array.isArray(data)
          ? data
          : Array.isArray(data?.orders)
            ? data.orders
            : [];

        setOrders(orderList);
      } catch (err) {
        console.error("Failed to load orders:", err);
        setError("Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatPrice = (price) => {
    return `₹${Number(price || 0).toLocaleString("en-IN")}`;
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-600";
      case "cancelled":
        return "bg-red-50 text-red-600";
      case "pending":
      default:
        return "bg-yellow-50 text-yellow-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] pb-10">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            className="rounded-full bg-gray-100 p-2 text-gray-700"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              My Orders
            </h1>

            <p className="text-xs text-gray-500">
              View your EMI purchases
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-[28px] bg-white"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-[28px] bg-white px-6 py-14 text-center">
            <div className="text-4xl">⚠️</div>

            <h2 className="mt-3 text-lg font-bold text-gray-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-[#6d28d9] px-5 py-3 text-sm font-bold text-white"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="rounded-[28px] bg-white px-6 py-16 text-center">
            <Package
              size={48}
              className="mx-auto text-[#6d28d9]"
            />

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your EMI purchases will appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="mt-6 rounded-xl bg-[#6d28d9] px-6 py-3 text-sm font-bold text-white"
            >
              Start Shopping
            </button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#6d28d9]">
                  PURCHASE HISTORY
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  Your orders
                </h2>
              </div>

              <span className="text-sm text-gray-400">
                {orders.length}{" "}
                {orders.length === 1 ? "order" : "orders"}
              </span>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-[28px] bg-white p-5 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-purple-50">
                      <Package
                        size={36}
                        className="text-[#6d28d9]"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold text-[#6d28d9]">
                            EMI PURCHASE
                          </p>

                          <h3 className="mt-1 text-lg font-bold text-gray-900">
                            {order.productName || "Product"}
                          </h3>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status || "pending"}
                        </span>
                      </div>

                      {order.variant && (
                        <p className="mt-2 text-sm text-gray-500">
                          {order.variant.name}:{" "}
                          {order.variant.value}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-[#f7f7f8] p-4 sm:grid-cols-4">
                    <div>
                      <p className="text-xs text-gray-400">
                        Product price
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {formatPrice(order.productPrice)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Monthly EMI
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {formatPrice(
                          order.plan?.monthlyAmount
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Tenure
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {order.plan?.tenure || 0} months
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Interest
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {order.plan?.interestRate ?? 0}%
                      </p>
                    </div>
                  </div>

                  {order.plan?.cashback > 0 && (
                    <div className="mt-4 rounded-2xl bg-green-50 px-4 py-3">
                      <p className="text-sm font-semibold text-green-600">
                        ₹
                        {Number(
                          order.plan.cashback
                        ).toLocaleString("en-IN")}{" "}
                        cashback
                      </p>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs text-gray-400">
                        Order ID
                      </p>

                      <p className="mt-1 max-w-[180px] truncate text-xs font-semibold text-gray-600">
                        {order._id}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/orders/${order._id}`, {
                          state: { order },
                        })
                      }
                      className="flex items-center gap-1 rounded-xl bg-[#6d28d9] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#5b21b6]"
                    >
                      View Order
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Orders;