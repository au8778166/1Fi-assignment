import {
  Home,
  Store,
  ReceiptText,
  ChartNoAxesColumnIncreasing,
  UserRound,
} from "lucide-react";

const BottomNav = () => {
  const items = [
    {
      label: "Home",
      icon: Home,
    },
    {
      label: "Shop",
      icon: Store,
      active: true,
    },
    {
      label: "EMI Dues",
      icon: ReceiptText,
    },
    {
      label: "Limit",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      label: "Profile",
      icon: UserRound,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3">
      <div className="mx-auto flex max-w-lg items-center justify-around rounded-[28px] border border-gray-100 bg-white px-2 py-3 shadow-[0_8px_35px_rgba(0,0,0,0.12)]">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`relative flex min-w-[58px] flex-col items-center gap-1 text-xs font-medium ${
                item.active
                  ? "text-[#6d28d9]"
                  : "text-gray-400"
              }`}
            >
              {item.active && (
                <span className="absolute -top-3 h-1 w-7 rounded-full bg-[#6d28d9]" />
              )}

              <Icon size={23} strokeWidth={item.active ? 2.5 : 2} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;