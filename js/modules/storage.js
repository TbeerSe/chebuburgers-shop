// Работа с localStorage

const STORAGE_KEY = 'chebuburger-cart';

export function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => {
        return (
          item &&
          item.id &&
          item.name &&
          Number.isFinite(Number(item.price)) &&
          Number(item.quantity) > 0
        );
      })
      .map((item) => ({
        id: String(item.id),
        name: String(item.name),
        price: Number(item.price),
        quantity: Math.max(1, Number(item.quantity)),
      }));
  } catch (error) {
    console.error('Не удалось загрузить корзину:', error);
    return [];
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Не удалось сохранить корзину:', error);
  }
}
