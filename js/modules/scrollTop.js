// Кнопка «Наверх»

export function initScrollTop() {
  const button = document.querySelector('#scroll-top');
  if (!button) return;

  const SCROLL_THRESHOLD = 400;

  function updateVisibility() {
    button.hidden = window.scrollY <= SCROLL_THRESHOLD;
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  updateVisibility();
}
