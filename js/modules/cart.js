// Логика корзины

import { loadCart, saveCart } from './storage.js';

export function createCart() {
  let items = loadCart();

  return {
    getItems() {
      return [...items];
    },

    add(product) {
      const existing = items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        items.push({
          id: String(product.id),
          name: product.name,
          price: Number(product.price),
          quantity: 1,
        });
      }

      saveCart(items);
    },

    remove(productId) {
      items = items.filter((item) => item.id !== productId);
      saveCart(items);
    },

    changeQuantity(productId, delta) {
      const item = items.find((i) => i.id === productId);
      if (!item) return;

      item.quantity += delta;

      if (item.quantity <= 0) {
        this.remove(productId);
        return;
      }

      saveCart(items);
    },

    clear() {
      items = [];
      saveCart(items);
    },

    getTotalQuantity() {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    getTotalPrice() {
      return items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    isEmpty() {
      return items.length === 0;
    },
  };
}
