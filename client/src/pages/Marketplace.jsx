import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  Search,
  Smartphone,
  Laptop,
  Bike,
  Plane,
  ShoppingBag,
} from "lucide-react";

import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { name: "All", icon: ShoppingBag },
    { name: "Smartphones", icon: Smartphone },
    { name: "Laptops", icon: Laptop },
    { name: "Travel", icon: Plane },
    { name: "Vehicles", icon: Bike },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        console.log("Products API response:", data);

        const productList = Array.isArray(data?.products)
          ? data.products
          : Array.isArray(data)
            ? data
            : [];

        setProducts(productList);
      } catch (err) {
        console.error("Failed to load products:", err);

        setError(
          "We couldn't load the marketplace right now."
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return products.filter((product) => {
      if (!product) return false;

      const productName =
        product.name?.toLowerCase() || "";

      const brand =
        product.brand?.toLowerCase() || "";

      const productCategory =
        product.category?.toLowerCase() || "";

      const matchesSearch =
        !searchText ||
        productName.includes(searchText) ||
        brand.includes(searchText) ||
        productCategory.includes(searchText);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const getCategoryCount = (categoryName) => {
    if (categoryName === "All") {
      return products.length;
    }

    return products.filter(
      (product) =>
        product?.category === categoryName
    ).length;
  };

  const handleSeeAll = () => {
    setCategory("All");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] pb-28">

      {/* ================= HERO ================= */}
      <section className="overflow-hidden rounded-b-[38px] bg-gradient-to-br from-[#40148c] via-[#5b21b6] to-[#7c3aed] px-5 pb-8 pt-8 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide">
            ✦ NO-COST EMIs
          </div>

          <div className="mt-5 max-w-xl">

            <h1 className="text-[32px] font-bold leading-[1.08] sm:text-5xl">
              Shop today,
              <br />

              <span className="font-normal italic">
                pay later
              </span>{" "}
              using mutual funds.
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-purple-100 sm:text-base">
              No credit score required. No interest.
              <br />
              Backed by your investments.
            </p>

          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ================= TABS ================= */}
        <div className="relative z-10 -mt-6 rounded-[28px] bg-[#f1edff] p-1.5 shadow-sm">

          <div className="grid grid-cols-3">

            {/* Top Brands */}
            <button
              type="button"
              className="relative rounded-[22px] px-2 py-3 text-xs font-semibold text-gray-500 transition hover:bg-white/60 sm:text-sm"
            >
              Top Brands
            </button>

            {/* Nearby Stores */}
            <button
              type="button"
              className="relative rounded-[22px] px-2 py-3 text-xs font-semibold text-gray-500 transition hover:bg-white/60 sm:text-sm"
            >
              Nearby Stores
            </button>

            {/* 1Fi Marketplace - ACTIVE */}
            <button
              type="button"
              className="relative rounded-[22px] bg-white px-2 py-3 text-xs font-bold text-[#6d28d9] shadow-sm sm:text-sm"
            >
              1Fi Marketplace

              {/* Active underline */}
              <span
                className="
                  absolute
                  bottom-1
                  left-1/2
                  h-1
                  w-8
                  -translate-x-1/2
                  rounded-full
                  bg-[#6d28d9]
                "
              />
            </button>

          </div>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="mt-5 flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3.5 shadow-sm">

          <Search
            size={21}
            className="shrink-0 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search products..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-xs font-semibold text-[#6d28d9]"
            >
              Clear
            </button>
          )}

        </div>

        {/* ================= CATEGORIES ================= */}
        <div className="mt-6">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold text-gray-900">
              Categories
            </h2>

            <button
              type="button"
              onClick={handleSeeAll}
              className="flex items-center gap-1 text-sm font-semibold text-[#6d28d9]"
            >
              See all
              <ChevronRight size={16} />
            </button>

          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

            {categories.map((item) => {
              const Icon = item.icon;

              const active =
                category === item.name;

              const count =
                getCategoryCount(item.name);

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() =>
                    setCategory(item.name)
                  }
                  className={`flex min-w-[92px] flex-col items-center justify-center gap-2 rounded-2xl px-3 py-3 transition ${
                    active
                      ? "bg-[#6d28d9] text-white shadow-sm"
                      : "bg-white text-gray-500 hover:bg-purple-50"
                  }`}
                >

                  <Icon size={22} />

                  <span className="text-xs font-semibold">
                    {item.name}
                  </span>

                  {count > 0 && (
                    <span
                      className={`text-[10px] font-medium ${
                        active
                          ? "text-purple-100"
                          : "text-gray-400"
                      }`}
                    >
                      {count}{" "}
                      {count === 1
                        ? "product"
                        : "products"}
                    </span>
                  )}

                </button>
              );
            })}

          </div>
        </div>

        {/* ================= PRODUCTS HEADER ================= */}
        <div className="mt-7 flex items-end justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-[#6d28d9]">
              SHOP ON EMI
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Featured products
            </h2>

          </div>

          {!loading && !error && (
            <span className="text-xs text-gray-400">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}
            </span>
          )}

        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="mt-4">

          {/* Loading */}
          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[390px] animate-pulse rounded-[28px] bg-white"
                />
              ))}

            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-[28px] bg-white px-6 py-14 text-center shadow-sm">

              <div className="text-4xl">
                ⚠️
              </div>

              <h3 className="mt-3 font-bold text-gray-900">
                Something went wrong
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-5 rounded-xl bg-[#6d28d9] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#5b21b6]"
              >
                Try again
              </button>

            </div>
          )}

          {/* No products */}
          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="rounded-[28px] bg-white px-6 py-14 text-center shadow-sm">

                <div className="text-4xl">
                  🔍
                </div>

                <h3 className="mt-3 font-bold text-gray-900">
                  No products found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try a different search or category.
                </p>

                {(search ||
                  category !== "All") && (
                  <button
                    type="button"
                    onClick={handleSeeAll}
                    className="mt-5 rounded-xl bg-[#6d28d9] px-5 py-3 text-sm font-bold text-white"
                  >
                    View all products
                  </button>
                )}

              </div>
            )}

          {/* Product cards */}
          {!loading &&
            !error &&
            filteredProducts.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {filteredProducts.map(
                  (product) => (
                    <ProductCard
                      key={
                        product._id ||
                        product.id ||
                        product.slug
                      }
                      product={product}
                    />
                  )
                )}

              </div>
            )}

        </div>

      </main>

      
      <BottomNav />

    </div>
  );
};

export default Marketplace;