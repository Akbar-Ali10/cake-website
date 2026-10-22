import { businessConfig, ADVANCE_PERCENTAGE } from '@/config/siteConfig';
import type { CartItem, OrderInfo } from '@/types';

export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

export function buildWaLink(message: string): string {
  const whatsappNumber = businessConfig.whatsapp?.trim();
  const isConfigured = Boolean(whatsappNumber && whatsappNumber !== 'YOUR_WHATSAPP_NUMBER');

  if (!isConfigured) {
    return '#';
  }

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildSingleCakeOrderMessage(
  cakeName: string,
  sizeLabel: string,
  weight: string,
  flavourLabel: string,
  quantity: number,
  unitPrice: number,
  info: OrderInfo
): string {
  const total = unitPrice * quantity;
  const advance = Math.round((total * ADVANCE_PERCENTAGE) / 100);
  const remaining = total - advance;

  return [
    `*New Cake Order — ${businessConfig.name}*`,
    '',
    `🍰 Cake: ${cakeName}`,
    `📏 Size: ${sizeLabel} (${weight})`,
    `🍯 Flavour: ${flavourLabel}`,
    `🔢 Quantity: ${quantity}`,
    `💰 Unit Price: ${formatPKR(unitPrice)}`,
    `💵 Total: ${formatPKR(total)}`,
    `⏳ 30% Advance: ${formatPKR(advance)}`,
    `📋 Remaining (70%): ${formatPKR(remaining)}`,
    '',
    '--- Customer Details ---',
    `👤 Name: ${info.name}`,
    `📱 Phone: ${info.phone}`,
    `📍 Address: ${info.address}`,
    `🗺️ Area: ${info.deliveryArea}`,
    `📅 Delivery Date: ${info.deliveryDate}`,
    `⏰ Delivery Slot: ${info.deliverySlot}`,
    `📝 Instructions: ${info.instructions || 'None'}`,
    '',
    '⚠️ This order is not confirmed until the business confirms it.',
  ].join('\n');
}

export function buildCartOrderMessage(items: CartItem[], info: OrderInfo, deliveryCharge: number): string {
  const lines: string[] = [
    `*New Cake Order — ${businessConfig.name}*`,
    '',
    '--- Order Items ---',
  ];

  let subtotal = 0;
  items.forEach((item, i) => {
    const lineTotal = item.unitPrice * item.quantity;
    subtotal += lineTotal;
    lines.push(
      `${i + 1}. ${item.cakeName} — ${item.sizeLabel} (${item.weight}), ${item.flavourLabel}`,
      `   Qty: ${item.quantity} × ${formatPKR(item.unitPrice)} = ${formatPKR(lineTotal)}`
    );
  });

  const total = subtotal + deliveryCharge;
  const advance = Math.round((total * ADVANCE_PERCENTAGE) / 100);
  const remaining = total - advance;

  lines.push(
    '',
    `Subtotal: ${formatPKR(subtotal)}`,
    `Delivery Charge: ${formatPKR(deliveryCharge)}`,
    `💵 Total: ${formatPKR(total)}`,
    `⏳ 30% Advance: ${formatPKR(advance)}`,
    `📋 Remaining (70%): ${formatPKR(remaining)}`,
    '',
    '--- Customer Details ---',
    `👤 Name: ${info.name}`,
    `📱 Phone: ${info.phone}`,
    `📍 Address: ${info.address}`,
    `🗺️ Area: ${info.deliveryArea}`,
    `📅 Delivery Date: ${info.deliveryDate}`,
    `⏰ Delivery Slot: ${info.deliverySlot}`,
    `📝 Instructions: ${info.instructions || 'None'}`,
    '',
    '⚠️ This order is not confirmed until the business confirms it.'
  );

  return lines.join('\n');
}

export function buildEventCakeInquiryMessage(): string {
  return [
    `Hello ${businessConfig.name}!`,
    '',
    "I'd like to enquire about a custom event cake. Please share details about:",
    '• Design and theme',
    '• Number of guests / servings',
    '• Flavours',
    '• Preferred date',
    '• Any other requirements',
    '',
    'Thank you!',
  ].join('\n');
}
