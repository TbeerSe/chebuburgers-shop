# 🍔 ЧебуБургер

Адаптивный лендинг для фастфуд-ресторана с корзиной, фильтрами меню и формой заказа.

[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://tbeerse.github.io/chebuburgers-shop/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## 🔗 Демо

**[Посмотреть на GitHub Pages](https://tbeerse.github.io/chebuburgers-shop/)**

## ✨ Возможности

- 🍔 Каталог блюд с фильтрацией по категориям (бургеры, закуски, напитки)
- 🛒 Корзина с сохранением в `localStorage`
- ➕ Изменение количества товаров и удаление позиций
- 📱 Полностью адаптивная вёрстка (mobile-first)
- 📝 Валидация формы заказа: имя, телефон, адрес
- ☎️ Маска для российского номера телефона
- ♿ Доступность: ARIA-атрибуты, клавиатурная навигация, `prefers-reduced-motion`
- 💾 Данные корзины не теряются при перезагрузке
- 🔔 Всплывающие уведомления при добавлении товара

## 🛠 Технологии

- **HTML5** — семантическая вёрстка
- **CSS3** — переменные, Grid, Flexbox, media queries
- **JavaScript (ES Modules)** — чистый JS без фреймворков
- **LocalStorage API** — сохранение состояния корзины
- **Google Fonts** — Manrope

## 🚀 Установка и запуск

### Клонировать репозиторий

git clone https://github.com/TbeerSe/chebuburgers-shop.git
cd chebuburgers-shop

### Запустить локальный сервер

Для работы ES-модулей нужен HTTP-сервер (из-за политики безопасности браузера file:// не подойдёт).

python -m http.server 8000

или через Node.js:

npx serve .

Затем открой http://localhost:8000 в браузере.

## 📁 Структура проекта

chebuburgers-shop/
├── index.html
├── css/
│   ├── base.css          # переменные, типографика, сброс
│   ├── layout.css        # сетки, header, секции, footer
│   └── components.css    # кнопки, карточки, формы, корзина
├── js/
│   ├── main.js           # точка входа
│   └── modules/
│       ├── cart.js       # логика корзины
│       ├── storage.js    # localStorage
│       ├── filters.js    # фильтры меню
│       ├── form.js       # валидация формы
│       ├── phone.js      # маска телефона
│       ├── scrollTop.js  # кнопка «Наверх»
│       ├── toast.js      # всплывашки
│       └── ui.js         # рендер корзины
├── images/
├── README.md
└── LICENSE

## 📸 Скриншот

Добавь скриншот главной страницы в images/screenshot.png и раскомментируй строку ниже.

<!-- ![Скриншот](./images/screenshot.png) -->

## 🗺 Планы по развитию

- [ ] Подключить backend для реальной отправки заказов
- [ ] Добавить страницу отдельного товара
- [ ] Реализовать тёмную тему
- [ ] Добавить анимации появления карточек при скролле
- [ ] Оптимизировать изображения (srcset, WebP)

## 📄 Лицензия

[MIT](./LICENSE) © 2026 ЧебуБургер
