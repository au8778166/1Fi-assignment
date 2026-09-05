import {
  Home,
  Store,
  ReceiptText,
  ChartNoAxesColumnIncreasing,
  UserRound,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Home",
      icon: Home,
      path: "/",
    },
    {
      label: "Shop",
      icon: Store,
      path: "/marketplace",
    },
    {
      label: "EMI Dues",
      icon: ReceiptText,
      path: "/orders",
    },
    {
      label: "Limit",
      icon: ChartNoAxesColumnIncreasing,
      path: "/limit",
    },
    {
      label: "Profile",
      icon: UserRound,
      path: "/profile",
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    if (path === "/marketplace") {
      return location.pathname.startsWith("/marketplace");
    }

    if (path === "/orders") {
      return (
        location.pathname.startsWith("/orders") ||
        location.pathname === "/order-success"
      );
    }

    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3">
      <div className="mx-auto flex max-w-lg items-center justify-around rounded-[28px] border border-gray-100 bg-white px-2 py-3 shadow-[0_8px_35px_rgba(0,0,0,0.12)]">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.path)}
              className={`relative flex min-w-[58px] flex-col items-center gap-1 text-xs font-medium transition ${
                active
                  ? "text-[#6d28d9]"
                  : "text-gray-400"
              }`}
            >
              {/* Active underline */}
              {active && (
                <span className="absolute -top-3 h-1 w-7 rounded-full bg-[#6d28d9]" />
              )}

              <Icon
                size={23}
                strokeWidth={active ? 2.5 : 2}
              />

              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;