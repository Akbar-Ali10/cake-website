import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/utils/whatsapp';
import { ADVANCE_PERCENTAGE, deliveryConfig } from '@/config/siteConfig';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  const deliveryCharge = subtotal > 0 ? deliveryConfig.defaultCharge : 0;
  const total = subtotal + deliveryCharge;
  const advance = Math.round((total * ADVANCE_PERCENTAGE) / 100);
  const remaining = total - advance;

  if (items.length === 0) {
    return (
      <div className="animate-fade-in pt-28 pb-20 min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-cocoa-300" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-cocoa-700 mb-3">Your Cart is Empty</h1>
          <p className="text-cocoa-500 mb-8">
            Looks like you haven't added any cakes yet. Browse our collection and find the perfect cake for your celebration.
          </p>
          <button
            onClick={() => onNavigate('catalogue')}
            className="inline-flex items-center gap-2 bg-cocoa-600 text-cream-50 px-7 py-3.5 rounded-full font-medium hover:bg-cocoa-500 transition-all duration-300"
          >
            Browse Our Cakes
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pt-28 pb-20 min-h-screen bg-cream-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-cocoa-700 mb-2">Your Cart</h1>
        <p className="text-cocoa-400 mb-8">{itemCount} item{itemCount > 1 ? 's' : ''} in your cart</p>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {items.map((item, index) => (
            <div
              key={`${item.cakeId}-${item.sizeLabel}-${item.flavourLabel}-${index}`}
              className="bg-cream-100 rounded-2xl p-4 flex gap-4 items-center border border-cream-200"
            >
              <img
                src={item.image}
                alt={item.cakeName}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-semibold text-cocoa-700 truncate">{item.cakeName}</h3>
                <p className="text-sm text-cocoa-500">
                  {item.sizeLabel} ({item.weight}) · {item.flavourLabel}
                </p>
                <p className="text-sm font-medium text-cocoa-600 mt-1">{formatPKR(item.unitPrice)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-cream-200 text-cocoa-600 flex items-center justify-center hover:bg-cream-300 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-medium text-cocoa-700 w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-cream-200 text-cocoa-600 flex items-center justify-center hover:bg-cream-300 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-cocoa-700">{formatPKR(item.unitPrice * item.quantity)}</p>
                <button
                  onClick={() => removeItem(index)}
                  className="text-cocoa-400 hover:text-red-500 transition-colors mt-1"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-cream-100 rounded-2xl p-6 border border-cream-200 mb-6">
          <h2 className="font-display text-xl font-semibold text-cocoa-700 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-cocoa-600">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-cocoa-600">
              <span>Delivery ({deliveryConfig.city})</span>
              <span>{formatPKR(deliveryCharge)}</span>
            </div>
            <div className="flex justify-between font-semibold text-cocoa-700 text-base pt-2 border-t border-cream-200">
              <span>Total</span>
              <span>{formatPKR(total)}</span>
            </div>
            <div className="flex justify-between text-cocoa-500 pt-1">
              <span>{ADVANCE_PERCENTAGE}% Advance (to confirm)</span>
              <span className="font-medium">{formatPKR(advance)}</span>
            </div>
            <div className="flex justify-between text-cocoa-500">
              <span>Remaining (on delivery)</span>
              <span>{formatPKR(remaining)}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-cocoa-400 mb-6 text-center">
          {deliveryConfig.note} · Your order is not confirmed until the business confirms it.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigate('catalogue')}
            className="flex-1 inline-flex items-center justify-center gap-2 border border-cocoa-300 text-cocoa-700 px-6 py-3.5 rounded-full font-medium hover:bg-cream-200 transition-all duration-300"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => onNavigate('checkout')}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-cocoa-600 text-cream-50 px-6 py-3.5 rounded-full font-medium hover:bg-cocoa-500 transition-all duration-300"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
