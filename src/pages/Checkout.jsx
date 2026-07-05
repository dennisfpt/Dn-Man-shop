import React, { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Truck,
  Landmark,
  CheckCircle2,
  Copy,
  Check,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

// ---- Store / bank configuration -------------------------------------
// Swap these placeholders for your real merchant bank details.
const BANK_INFO = {
  bankId: "MB", // VietQR bank code/BIN — MB Bank
  bankName: "MB Bank",
  accountNumber: "0865156242",
  accountName: "DUONG THI KIM YEN",
};

// Store prices are listed in USD; VietQR transfers are in VND, so we
// convert using a fixed illustrative rate. Replace with a live rate
// or your own VND pricing in production.
const USD_TO_VND = 25000;

const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_FEE = 8;

function generateOrderId() {
  const stamp = Date.now().toString().slice(-8);
  return `DNMAN${stamp}`;
}

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' | 'bank'
  const [order, setOrder] = useState(null); // set once order is placed
  const [copied, setCopied] = useState(false);

  const shippingFee = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    else if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number";
    if (!form.address.trim()) next.address = "Shipping address is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = generateOrderId();
    setOrder({
      id: orderId,
      items: cartItems,
      subtotal,
      shippingFee,
      total,
      paymentMethod,
      shipping: { ...form },
    });
    clearCart();
  };

  const vietQrUrl = useMemo(() => {
    if (!order) return "";
    const amountVnd = Math.round(order.total * USD_TO_VND);
    const addInfo = `${order.id}`;
    const { bankId, accountNumber, accountName } = BANK_INFO;
    return `https://img.vietqr.io/image/${bankId}-${accountNumber}-print.jpg?amount=${amountVnd}&addInfo=${encodeURIComponent(
      addInfo
    )}&accountName=${encodeURIComponent(accountName)}`;
  }, [order]);

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText(BANK_INFO.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Redirect away if there's nothing to check out and no order was just placed
  if (cartItems.length === 0 && !order) {
    return <Navigate to="/shop" replace />;
  }

  // ---------------------------------------------------------------
  // Order confirmation view
  // ---------------------------------------------------------------
  if (order) {
    const amountVnd = Math.round(order.total * USD_TO_VND);
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <CheckCircle2 size={44} className="mx-auto text-ink mb-4" />
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {order.paymentMethod === "bank" ? "Order placed — awaiting payment" : "Order placed successfully!"}
          </h1>
          <p className="text-stone text-sm mt-2">
            Order code: <span className="text-ink font-medium">{order.id}</span>
          </p>
        </div>

        {order.paymentMethod === "cod" ? (
          <div className="border border-ink/10 p-6 sm:p-8 text-center">
            <Truck size={28} className="mx-auto text-ink mb-3" />
            <p className="text-sm text-charcoal">
              You'll pay <span className="font-medium">${order.total.toFixed(2)}</span> in
              cash when your order arrives at:
            </p>
            <p className="text-sm text-ink font-medium mt-2">
              {order.shipping.fullName} — {order.shipping.phone}
            </p>
            <p className="text-sm text-stone">{order.shipping.address}</p>
          </div>
        ) : (
          <div className="border border-ink/10 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-1 space-y-3">
                <h2 className="text-sm uppercase tracking-widest2 font-medium mb-4">
                  Bank Transfer Details
                </h2>
                <div className="text-sm">
                  <p className="text-stone text-xs uppercase tracking-wide">Bank Name</p>
                  <p className="text-ink font-medium">{BANK_INFO.bankName}</p>
                </div>
                <div className="text-sm">
                  <p className="text-stone text-xs uppercase tracking-wide">Account Number</p>
                  <div className="flex items-center gap-2">
                    <p className="text-ink font-medium">{BANK_INFO.accountNumber}</p>
                    <button
                      onClick={handleCopyAccount}
                      className="text-stone hover:text-ink transition-colors"
                      aria-label="Copy account number"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-stone text-xs uppercase tracking-wide">Account Holder</p>
                  <p className="text-ink font-medium">{BANK_INFO.accountName}</p>
                </div>
                <div className="text-sm">
                  <p className="text-stone text-xs uppercase tracking-wide">Amount</p>
                  <p className="text-ink font-medium">
                    {amountVnd.toLocaleString("vi-VN")}&nbsp;VND{" "}
                    <span className="text-stone font-normal">
                      (${order.total.toFixed(2)})
                    </span>
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-stone text-xs uppercase tracking-wide">Transfer Note</p>
                  <p className="text-ink font-medium">{order.id}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 shrink-0">
                <img
                  src={vietQrUrl}
                  alt="VietQR payment code"
                  className="w-48 h-auto border border-ink/10"
                />
                <p className="text-xs text-stone">Scan with your banking app</p>
              </div>
            </div>

            <p className="text-xs text-stone bg-fog/60 border border-ink/10 px-4 py-3 mt-6">
              Hệ thống sẽ kiểm tra và xác nhận đơn hàng sau khi nhận được chuyển khoản.
            </p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/"
            className="inline-block bg-ink text-cream px-8 py-3.5 text-sm uppercase tracking-wide font-medium hover:bg-charcoal transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------
  // Checkout form view
  // ---------------------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Checkout</h1>

      {!isAuthenticated && (
        <p className="text-sm text-stone mb-8">
          <Link to="/login" state={{ from: "/checkout" }} className="text-ink border-b border-ink pb-0.5">
            Sign in
          </Link>{" "}
          for faster checkout, or continue as a guest below.
        </p>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
        {/* Left: Shipping Information */}
        <div>
          <h2 className="text-sm uppercase tracking-widest2 font-medium mb-6">
            Shipping Information
          </h2>

          <div className="space-y-5 max-w-md">
            <div>
              <label className="text-xs uppercase tracking-wide text-stone">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={handleChange("fullName")}
                placeholder="Nguyen Van A"
                className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none placeholder:text-stone/60 ${
                  errors.fullName ? "border-red-500" : "border-ink/20 focus:border-ink"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-stone">
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="09xx xxx xxx"
                className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none placeholder:text-stone/60 ${
                  errors.phone ? "border-red-500" : "border-ink/20 focus:border-ink"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-stone">
                Shipping Address
              </label>
              <textarea
                rows={3}
                value={form.address}
                onChange={handleChange("address")}
                placeholder="Street, Ward, District, City"
                className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none resize-none placeholder:text-stone/60 ${
                  errors.address ? "border-red-500" : "border-ink/20 focus:border-ink"
                }`}
              />
              {errors.address && (
                <p className="text-xs text-red-600 mt-1">{errors.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Order Summary + Payment */}
        <div>
          <h2 className="text-sm uppercase tracking-widest2 font-medium mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-16 object-cover bg-fog shrink-0"
                />
                <div className="flex-1 flex justify-between text-sm">
                  <div>
                    <p className="font-medium leading-snug">{item.name}</p>
                    <p className="text-xs text-stone mt-0.5">
                      Size {item.size} · Qty {item.qty}
                    </p>
                  </div>
                  <p className="font-medium whitespace-nowrap">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-ink/10 mt-5 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone">Shipping</span>
              <span>{shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-medium pt-2 border-t border-ink/10">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment method selection */}
          <div className="mt-8">
            <h2 className="text-sm uppercase tracking-widest2 font-medium mb-4">
              Payment Method
            </h2>

            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 border px-4 py-3.5 cursor-pointer transition-colors ${
                  paymentMethod === "cod" ? "border-ink bg-ink/[0.03]" : "border-ink/15 hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-ink"
                />
                <Truck size={18} className="text-ink shrink-0" />
                <div>
                  <p className="text-sm font-medium">Cash on Delivery (COD)</p>
                  <p className="text-xs text-stone">Pay in cash when your order arrives</p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 border px-4 py-3.5 cursor-pointer transition-colors ${
                  paymentMethod === "bank" ? "border-ink bg-ink/[0.03]" : "border-ink/15 hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="accent-ink"
                />
                <Landmark size={18} className="text-ink shrink-0" />
                <div>
                  <p className="text-sm font-medium">Bank Transfer / VietQR</p>
                  <p className="text-xs text-stone">Chuyển khoản ngân hàng qua mã VietQR</p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-ink text-cream py-4 text-sm uppercase tracking-wide font-medium hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            Place Order (Đặt hàng)
          </button>
        </div>
      </form>
    </div>
  );
}
