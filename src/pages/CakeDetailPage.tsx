import { useState } from 'react';
import { ArrowLeft, ShoppingBag, MessageCircle, Minus, Plus, Check } from 'lucide-react';
import type { Cake } from '@/config/siteConfig';
import { formatPKR, buildWaLink, buildSingleCakeOrderMessage } from '@/utils/whatsapp';
import { useCart } from '@/context/CartContext';
import { deliveryConfig, ADVANCE_PERCENTAGE } from '@/config/siteConfig';
import type { OrderInfo } from '@/types';

interface CakeDetailPageProps {
  cake: Cake;
  onBack: () => void;
}

export default function CakeDetailPage({ cake, onBack }: CakeDetailPageProps) {
  const { addToCart } = useCart();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFlavourIndex, setSelectedFlavourIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const selectedSize = cake.sizes[selectedSizeIndex];
  const selectedFlavour = cake.flavours[selectedFlavourIndex];
  const total = selectedSize.price * quantity;
  const advance = Math.round((total * ADVANCE_PERCENTAGE) / 100);
  const remaining = total - advance;

  const handleAddToCart = () => {
    addToCart({
      cakeId: cake.id,
      cakeName: cake.name,
      image: cake.image,
      sizeLabel: selectedSize.label,
      weight: selectedSize.weight,
      flavourLabel: selectedFlavour.label,
      unitPrice: selectedSize.price,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleWhatsAppOrder = () => {
    const info: OrderInfo = {
      name: '',
      phone: '',
      address: '',
      deliveryArea: '',
      deliveryDate: '',
      deliverySlot: '',
      instructions: '',
    };
    const message = buildSingleCakeOrderMessage(
      cake.name,
      selectedSize.label,
      selectedSize.weight,
      selectedFlavour.label,
      quantity,
      selectedSize.price,
      info
    );
    window.open(buildWaLink(message), '_blank');
  };

  return (
    <div className="animate-fade-in pt-28 pb-20 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-cocoa-500 hover:text-cocoa-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Cakes
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg h-[400px] lg:h-[520px]">
            <img
              src={cake.image}
              alt={cake.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa-700 mb-4">
              {cake.name}
            </h1>
            <p className="text-cocoa-600 leading-relaxed mb-6">{cake.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-cocoa-700 mb-3">Select Size</label>
              <div className="grid grid-cols-3 gap-3">
                {cake.sizes.map((size, i) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSizeIndex(i)}
                    className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                      selectedSizeIndex === i
                        ? 'border-cocoa-500 bg-cocoa-50 text-cocoa-700'
                        : 'border-cream-300 bg-cream-50 text-cocoa-600 hover:border-cream-400'
                    }`}
                  >
                    <p className="text-sm font-medium">{size.label}</p>
                    <p className="text-xs text-cocoa-400">{size.weight}</p>
                    <p className="text-sm font-semibold mt-1">{formatPKR(size.price)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Flavour Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-cocoa-700 mb-3">Select Flavour</label>
              <div className="flex flex-wrap gap-2">
                {cake.flavours.map((flavour, i) => (
                  <button
                    key={flavour.id}
                    onClick={() => setSelectedFlavourIndex(i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedFlavourIndex === i
                        ? 'bg-cocoa-600 text-cream-50'
                        : 'bg-cream-200 text-cocoa-600 hover:bg-cream-300'
                    }`}
                  >
                    {flavour.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-cocoa-700 mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-cream-200 text-cocoa-600 flex items-center justify-center hover:bg-cream-300 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium text-cocoa-700 w-10 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-cream-200 text-cocoa-600 flex items-center justify-center hover:bg-cream-300 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-cream-100 rounded-2xl p-5 mb-6 border border-cream-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-cocoa-500">Total ({quantity} × {formatPKR(selectedSize.price)})</span>
                <span className="text-2xl font-semibold text-cocoa-700">{formatPKR(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-cocoa-500 pt-2 border-t border-cream-200">
                <span>{ADVANCE_PERCENTAGE}% Advance (to confirm)</span>
                <span className="font-medium text-cocoa-600">{formatPKR(advance)}</span>
              </div>
              <div className="flex justify-between text-sm text-cocoa-500 mt-1">
                <span>Remaining (on delivery)</span>
                <span>{formatPKR(remaining)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all duration-300 ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-cocoa-600 text-cream-50 hover:bg-cocoa-500'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium bg-[#25D366] text-white hover:bg-[#1da851] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </button>
            </div>

            <p className="text-xs text-cocoa-400 mt-4 text-center">
              {deliveryConfig.note} · Your order is not confirmed until the business confirms it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
