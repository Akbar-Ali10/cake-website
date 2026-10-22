import { useState } from 'react';
import { ArrowLeft, MessageCircle, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import {
  formatPKR,
  buildWaLink,
  buildCartOrderMessage,
} from '@/utils/whatsapp';
import {
  ADVANCE_PERCENTAGE,
  deliveryConfig,
  paymentMethods,
  businessConfig,
} from '@/config/siteConfig';
import type { OrderInfo } from '@/types';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<OrderInfo>({
    name: '',
    phone: '',
    address: '',
    deliveryArea: deliveryConfig.areas[0]?.area || '',
    deliveryDate: '',
    deliverySlot: deliveryConfig.timeSlots[0] || '',
    instructions: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderInfo, string>>>({});
  const [ordered, setOrdered] = useState(false);

  const selectedArea = deliveryConfig.areas.find((a) => a.area === form.deliveryArea);
  const deliveryCharge = selectedArea?.charge ?? deliveryConfig.defaultCharge;
  const total = subtotal + deliveryCharge;
  const advance = Math.round((total * ADVANCE_PERCENTAGE) / 100);
  const remaining = total - advance;

  const validate = (): boolean => {
    const e: Partial<Record<keyof OrderInfo, string>> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number';
    else if (!/^[\d\s+\-()]{7,}$/.test(form.phone)) e.phone = 'Please enter a valid phone number';
    if (!form.address.trim()) e.address = 'Please enter your delivery address';
    if (!form.deliveryDate.trim()) e.deliveryDate = 'Please select a delivery date';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const message = buildCartOrderMessage(items, form, deliveryCharge);
    window.open(buildWaLink(message), '_blank');
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <div className="animate-fade-in pt-28 pb-20 min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-cocoa-700 mb-3">Order Sent on WhatsApp!</h1>
          <p className="text-cocoa-500 mb-6">
            Your order details have been sent to {businessConfig.name} on WhatsApp. Please also send your 30% advance payment proof on WhatsApp to confirm your order.
          </p>
          <div className="bg-cream-100 rounded-2xl p-5 text-left mb-6 border border-cream-200">
            <h3 className="font-medium text-cocoa-700 mb-2 text-sm">Payment Instructions:</h3>
            <ol className="text-sm text-cocoa-600 space-y-1 list-decimal list-inside">
              <li>Pay 30% advance ({formatPKR(advance)}) via Easypaisa, JazzCash or bank transfer.</li>
              <li>Send payment screenshot on WhatsApp.</li>
              <li>Your order is confirmed only after the business verifies your payment.</li>
            </ol>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 bg-cocoa-600 text-cream-50 px-7 py-3.5 rounded-full font-medium hover:bg-cocoa-500 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="animate-fade-in pt-28 pb-20 min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-cocoa-300 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-semibold text-cocoa-700 mb-3">Your Cart is Empty</h1>
          <p className="text-cocoa-500 mb-6">Add some cakes to your cart before checking out.</p>
          <button
            onClick={() => onNavigate('catalogue')}
            className="inline-flex items-center gap-2 bg-cocoa-600 text-cream-50 px-7 py-3.5 rounded-full font-medium hover:bg-cocoa-500 transition-all duration-300"
          >
            Browse Cakes
          </button>
        </div>
      </div>
    );
  }

  const inputClass = (field: keyof OrderInfo) =>
    `w-full px-4 py-3 rounded-xl border bg-cream-50 text-cocoa-800 placeholder-cocoa-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cocoa-400 ${
      errors[field] ? 'border-red-400' : 'border-cream-300 focus:border-cocoa-400'
    }`;

  return (
    <div className="animate-fade-in pt-28 pb-20 min-h-screen bg-cream-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('cart')}
          className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Cart
        </button>

        <h1 className="font-display text-4xl font-semibold text-cocoa-700 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-5">
            <h2 className="font-display text-xl font-semibold text-cocoa-700">Delivery Details</h2>
          </div>
          <div className="lg:hidden">
            {/* placeholder for grid */}
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cocoa-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass('name')}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-cocoa-700 mb-1.5">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass('phone')}
                  placeholder="03XX-XXXXXXX"
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-cocoa-700 mb-1.5">
                Delivery Address *
              </label>
              <textarea
                id="address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className={inputClass('address')}
                placeholder="House #, Street, Area, Karachi"
              />
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-cocoa-700 mb-1.5">
                  Delivery Area *
                </label>
                <select
                  id="area"
                  value={form.deliveryArea}
                  onChange={(e) => setForm({ ...form, deliveryArea: e.target.value })}
                  className={inputClass('deliveryArea')}
                >
                  {deliveryConfig.areas.map((a) => (
                    <option key={a.area} value={a.area}>
                      {a.area} ({formatPKR(a.charge)})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-cocoa-700 mb-1.5">
                  Delivery Date *
                </label>
                <input
                  id="date"
                  type="date"
                  value={form.deliveryDate}
                  onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                  className={inputClass('deliveryDate')}
                />
                {errors.deliveryDate && <p className="text-xs text-red-500 mt-1">{errors.deliveryDate}</p>}
              </div>
              <div>
                <label htmlFor="slot" className="block text-sm font-medium text-cocoa-700 mb-1.5">
                  Delivery Time Slot
                </label>
                <select
                  id="slot"
                  value={form.deliverySlot}
                  onChange={(e) => setForm({ ...form, deliverySlot: e.target.value })}
                  className={inputClass('deliverySlot')}
                >
                  {deliveryConfig.timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-cocoa-700 mb-1.5">
                Special Instructions
              </label>
              <textarea
                id="instructions"
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                rows={3}
                className={inputClass('instructions')}
                placeholder="Any message on cake, allergy info, or other notes..."
              />
            </div>
          </div>
        </div>

        {/* Order Summary + Payment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <div className="bg-cream-100 rounded-2xl p-6 border border-cream-200">
            <h2 className="font-display text-xl font-semibold text-cocoa-700 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-cocoa-600">
                  <span className="flex-1 pr-2">
                    {item.cakeName} ({item.sizeLabel}, {item.flavourLabel}) × {item.quantity}
                  </span>
                  <span className="font-medium">{formatPKR(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm pt-4 border-t border-cream-200">
              <div className="flex justify-between text-cocoa-600">
                <span>Subtotal</span>
                <span>{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-cocoa-600">
                <span>Delivery ({form.deliveryArea})</span>
                <span>{formatPKR(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between font-semibold text-cocoa-700 text-base pt-2 border-t border-cream-200">
                <span>Total</span>
                <span>{formatPKR(total)}</span>
              </div>
              <div className="flex justify-between text-cocoa-500">
                <span>{ADVANCE_PERCENTAGE}% Advance (to confirm)</span>
                <span className="font-medium">{formatPKR(advance)}</span>
              </div>
              <div className="flex justify-between text-cocoa-500">
                <span>Remaining (on delivery)</span>
                <span>{formatPKR(remaining)}</span>
              </div>
            </div>
          </div>

          <div className="bg-cream-100 rounded-2xl p-6 border border-cream-200">
            <h2 className="font-display text-xl font-semibold text-cocoa-700 mb-4">Payment Methods</h2>
            <p className="text-sm text-cocoa-500 mb-4">
              Pay 30% advance ({formatPKR(advance)}) through any of the following methods, then send payment proof on WhatsApp.
            </p>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="bg-cream-50 rounded-xl p-4 border border-cream-200">
                  <p className="font-medium text-cocoa-700 text-sm">{method.label}</p>
                  <p className="text-xs text-cocoa-400 mt-1">{method.accountName}</p>
                  <p className="text-sm text-cocoa-600 mt-1">{method.accountDetails}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blush-100 rounded-xl">
              <p className="text-xs text-cocoa-500">
                Your order is not confirmed until {businessConfig.name} verifies your advance payment on WhatsApp.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#1da851] transition-all duration-300 shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Send Order on WhatsApp
          </button>
          <p className="text-xs text-cocoa-400 mt-4 text-center">
            {deliveryConfig.note} · Your order is not confirmed until the business confirms it.
          </p>
        </div>
      </div>
    </div>
  );
}
