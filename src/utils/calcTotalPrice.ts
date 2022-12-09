import { CartItemType } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
};
