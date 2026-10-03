// Отрисовка корзины и уведомлений

export function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

function createQuantityButton({ action, productId, productName, label }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'quantity-button';
  button.dataset.action = action;
  button.dataset.productId = productId;
  button.setAttribute(
    'aria-label',
    `${label} количество товара «${productName}»`
  );
  button.textContent = action === 'increase' ? '+' : '−';
  return button;
}

export function createCartItem(item) {
  const listItem = document.createElement('li');
  listItem.dataset.productId = item.id;

  const productInfo = document.createElement('div');
  productInfo.className = 'cart-product-info';

  const productName = document.createElement('strong');
  productName.className = 'cart-product-name';
  productName.textContent = item.name;

  const productPrice = document.createElement('span');
  productPrice.className = 'cart-product-price';
  productPrice.textContent = `${formatPrice(item.price)} ₽ за шт.`;

  productInfo.append(productName, productPrice);

  const quantityControls = document.createElement('div');
  quantityControls.className = 'cart-quantity-controls';
  quantityControls.setAttribute(
    'aria-label',
    `Количество товара: ${item.name}`
  );

  const decreaseButton = createQuantityButton({
    action: 'decrease',
    productId: item.id,
    productName: item.name,
    label: 'Уменьшить',
  });

  const quantityValue = document.createElement('span');
  quantityValue.className = 'cart-quantity';
  quantityValue.textContent = String(item.quantity);
  quantityValue.setAttribute('aria-live', 'polite');

  const increaseButton = createQuantityButton({
    action: 'increase',
    productId: item.id,
    productName: item.name,
    label: 'Увеличить',
  });

  quantityControls.append(decreaseButton, quantityValue, increaseButton);

  const itemTotal = document.createElement('strong');
  itemTotal.className = 'cart-item-total';
  itemTotal.textContent = `${formatPrice(item.price * item.quantity)} ₽`;

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'remove-cart-item';
  removeButton.dataset.action = 'remove';
  removeButton.dataset.productId = item.id;
  removeButton.setAttribute(
    'aria-label',
    `Удалить товар «${item.name}» из корзины`
  );
  removeButton.textContent = 'Удалить';

  listItem.append(productInfo, quantityControls, itemTotal, removeButton);

  return listItem;
}

export function renderCart(cart, elements) {
  const {
    cartList,
    cartCount,
    navigationCartCount,
    navigationCartCountValue,
    totalPrice,
    clearCartButton,
    emptyCartMessage,
  } = elements;

  if (!cartList) return;

  cartList.innerHTML = '';

  const items = cart.getItems();
  const totalQuantity = cart.getTotalQuantity();
  const total = cart.getTotalPrice();

  if (cartCount) cartCount.textContent = `(${totalQuantity})`;

  if (navigationCartCount && navigationCartCountValue) {
    const prev = Number(navigationCartCountValue.textContent) || 0;
    navigationCartCountValue.textContent = String(totalQuantity);

    if (totalQuantity > prev) {
      navigationCartCount.classList.remove('pulse');
      void navigationCartCount.offsetWidth;
      navigationCartCount.classList.add('pulse');
    }
  }

  if (totalPrice) totalPrice.textContent = formatPrice(total);
  if (clearCartButton) clearCartButton.disabled = items.length === 0;

  if (emptyCartMessage) {
    emptyCartMessage.hidden = items.length > 0;
  }

  if (items.length === 0) return;

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    fragment.appendChild(createCartItem(item));
  });
  cartList.appendChild(fragment);
}

export function showButtonFeedback(button) {
  const originalText = button.textContent;

  button.textContent = 'Добавлено';
  button.disabled = true;

  window.setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 900);
}

export function showOrderMessage(el, message, type = 'success') {
  if (!el) return;

  // Стили успеха уже заданы для #order-message по умолчанию,
  // отдельный класс нужен только для ошибки.
  el.className = type === 'error' ? 'order-error' : '';
  el.textContent = message;
}

export function clearOrderMessage(el) {
  if (!el) return;

  el.className = '';
  el.textContent = '';
}
