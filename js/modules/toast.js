// Всплывающее уведомление внизу экрана

const TOAST_DURATION = 1800;
const VISIBLE_CLASS = 'toast--visible';

let hideTimer = null;

export function showToast(message) {
  const toast = document.querySelector('#toast');
  if (!toast) return;

  toast.innerHTML = '';

  const icon = document.createElement('span');
  icon.className = 'toast-icon';
  icon.textContent = '✓';
  icon.setAttribute('aria-hidden', 'true');

  const text = document.createElement('span');
  text.textContent = message;

  toast.append(icon, text);

  // Сбрасываем предыдущий таймер, если он был
  if (hideTimer) {
    window.clearTimeout(hideTimer);
  }

  toast.classList.add(VISIBLE_CLASS);

  hideTimer = window.setTimeout(() => {
    toast.classList.remove(VISIBLE_CLASS);
    hideTimer = null;
  }, TOAST_DURATION);
}
