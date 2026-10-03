// Фильтрация карточек меню

export function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const productCards = document.querySelectorAll('.card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.category;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle('active', isActive);
        filterButton.setAttribute('aria-pressed', String(isActive));
      });

      productCards.forEach((card) => {
        const shouldShow =
          selectedCategory === 'all' ||
          card.dataset.category === selectedCategory;

        card.hidden = !shouldShow;
      });
    });
  });
}
