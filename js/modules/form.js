// Валидация и отправка формы заказа

import { validatePhoneInput, normalizePhone } from './phone.js';
import { showOrderMessage, clearOrderMessage, renderCart } from './ui.js';

export function initOrderForm(cart, elements) {
  const { orderForm, orderMessage } = elements;
  if (!orderForm) return;

  const nameInput = document.querySelector('#customer-name');
  const phoneInput = document.querySelector('#customer-phone');
  const addressInput = document.querySelector('#customer-address');

  orderForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateForm({ nameInput, phoneInput, addressInput }, orderForm)) {
      return;
    }

    if (cart.isEmpty()) {
      showOrderMessage(
        orderMessage,
        'Добавьте хотя бы один товар в корзину.',
        'error'
      );

      document.querySelector('#cart')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }

    const submitButton = orderForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';
    const formData = new FormData(orderForm);

    const order = {
      customer: {
        name: String(formData.get('customerName')).trim(),
        phone: normalizePhone(String(formData.get('customerPhone'))),
        address: String(formData.get('customerAddress')).trim(),
      },
      items: cart.getItems(),
      total: cart.getTotalPrice(),
      createdAt: new Date().toISOString(),
    };

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Оформляем заказ...';
    }

    clearOrderMessage(orderMessage);

    try {
      /*
       * Пока backend не подключён, заказ имитируется локально.
       * Позже этот блок можно заменить на fetch-запрос к API.
       */
      await fakeOrderRequest(order);

      const orderNumber = generateOrderNumber();

      cart.clear();
      renderCart(cart, elements);
      orderForm.reset();

      showOrderMessage(
        orderMessage,
        `Спасибо, ${order.customer.name}! ` +
          `Ваш заказ №${orderNumber} принят. ` +
          'Мы скоро свяжемся с вами.'
      );

      orderForm.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } catch (error) {
      console.error('Ошибка оформления заказа:', error);
      showOrderMessage(
        orderMessage,
        'Не удалось оформить заказ. Попробуйте ещё раз.',
        'error'
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

function validateForm({ nameInput, phoneInput, addressInput }, form) {
  let isValid = true;

  if (nameInput) {
    const name = nameInput.value.trim();

    if (name.length < 2) {
      nameInput.setCustomValidity(
        'Введите имя длиной не менее двух символов.'
      );
      isValid = false;
    } else {
      nameInput.setCustomValidity('');
    }
  }

  if (!validatePhoneInput(phoneInput)) {
    isValid = false;
  }

  if (addressInput) {
    const address = addressInput.value.trim();

    if (address.length < 5) {
      addressInput.setCustomValidity('Введите полный адрес доставки.');
      isValid = false;
    } else {
      addressInput.setCustomValidity('');
    }
  }

  if (!isValid) form.reportValidity();
  return isValid;
}

function generateOrderNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

function fakeOrderRequest(order) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      console.log('Данные заказа:', order);
      resolve(order);
    }, 600);
  });
}
