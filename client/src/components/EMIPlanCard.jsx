const EMIPlanCard = ({ plan, selected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(plan)}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-[#6d28d9] bg-purple-50"
          : "border-gray-200 bg-white hover:border-purple-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">
            ₹{plan.monthlyAmount.toLocaleString("en-IN")}
            <span className="ml-1 text-xs font-normal text-gray-500">
              / month
            </span>
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {plan.tenure} months • {plan.interestRate}% interest
          </p>
        </div>

        <div
          className={`h-5 w-5 rounded-full border-2 ${
            selected
              ? "border-[#6d28d9] bg-[#6d28d9]"
              : "border-gray-300"
          }`}
        />
      </div>

      {plan.cashback > 0 && (
        <p className="mt-3 text-xs font-semibold text-green-600">
          ₹{plan.cashback.toLocaleString("en-IN")} cashback
        </p>
      )}

      {plan.interestRate === 0 && (
        <span className="mt-2 inline-block rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
          No-cost EMI
        </span>
      )}
    </button>
  );
};

export default EMIPlanCard;