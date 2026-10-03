// Точка входа приложения

import { createCart } from './modules/cart.js';
import { initFilters } from './modules/filters.js';
import { initPhoneInput } from './modules/phone.js';
import { initOrderForm } from './modules/form.js';
import { initScrollTop } from './modules/scrollTop.js';
import { showToast } from './modules/toast.js';
import { renderCart, showButtonFeedback } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const cart = createCart();

  const elements = {
    cartList: document.querySelector('#cart-list'),
    cartCount: document.querySelector('#cart-count'),
    navigationCartCount: document.querySelector('#navigation-cart-count'),
    navigationCartCountValue: document.querySelector('#navigation-cart-count-value'),
    totalPrice: document.querySelector('#total-price'),
    clearCartButton: document.querySelector('#clear-cart'),
    emptyCartMessage: document.querySelector('#empty-cart'),
    orderForm: document.querySelector('#order-form'),
    orderMessage: document.querySelector('#order-message'),
  };

  const phoneInput = document.querySelector('#customer-phone');

  initFilters();
  initPhoneInput(phoneInput);
  initOrderForm(cart, elements);
  initProductButtons(cart, elements);
  initCartActions(cart, elements);
  initClearCart(cart, elements);
  initScrollTop();

  renderCart(cart, elements);

  function initProductButtons(cart, elements) {
    const orderButtons = document.querySelectorAll('.order-button');

    orderButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const card = button.closest('.card');
        if (!card) return;

        const productId =
          card.dataset.productId ||
          button.dataset.productId ||
          button.dataset.product;

        const productName = button.dataset.product;
        const productPrice = Number(button.dataset.price);

        if (
          !productId ||
          !productName ||
          !Number.isFinite(productPrice)
        ) {
          return;
        }

        cart.add({
          id: String(productId),
          name: productName,
          price: productPrice,
        });

        renderCart(cart, elements);
        showButtonFeedback(button);
        showToast(`«${productName}» добавлен в корзину`);
      });
    });
  }

  function initCartActions(cart, elements) {
    elements.cartList?.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button) return;

      const productId = button.dataset.productId;
      const action = button.dataset.action;

      if (!productId || !action) return;

      if (action === 'increase') cart.changeQuantity(productId, 1);
      if (action === 'decrease') cart.changeQuantity(productId, -1);
      if (action === 'remove') cart.remove(productId);

      renderCart(cart, elements);
    });
  }

  function initClearCart(cart, elements) {
  const button = elements.clearCartButton;
  if (!button) return;

  button.addEventListener('click', () => {
    if (cart.isEmpty()) return;

    cart.clear();
    renderCart(cart, elements);
  });
  }
});
