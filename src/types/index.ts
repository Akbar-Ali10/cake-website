export interface CartItem {
  cakeId: string;
  cakeName: string;
  image: string;
  sizeLabel: string;
  weight: string;
  flavourLabel: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderInfo {
  name: string;
  phone: string;
  address: string;
  deliveryArea: string;
  deliveryDate: string;
  deliverySlot: string;
  instructions: string;
}
