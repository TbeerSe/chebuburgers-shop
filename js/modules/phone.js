// Маска и валидация российского номера телефона

export function getPhoneDigits(value) {
  let digits = String(value).replace(/\D/g, '');

  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits.startsWith('7')) {
    return digits.slice(1, 11);
  }

  return digits.slice(0, 10);
}

export function formatRussianPhone(digits) {
  if (!digits) return '';

  let result = '+7';

  if (digits.length > 0) result += ` (${digits.slice(0, 3)}`;
  if (digits.length >= 3) result += ')';
  if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) result += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) result += `-${digits.slice(8, 10)}`;

  return result;
}

export function normalizePhone(value) {
  const digits = getPhoneDigits(value);
  return `+7${digits}`;
}

export function validatePhoneInput(input) {
  if (!input) return false;

  const digits = getPhoneDigits(input.value);

  if (digits.length === 0) {
    input.setCustomValidity('Введите номер телефона.');
    return false;
  }

  if (digits.length !== 10) {
    input.setCustomValidity(
      'Введите полный номер телефона: +7 (999) 123-45-67.'
    );
    return false;
  }

  if (digits[0] !== '9') {
    input.setCustomValidity(
      'Введите корректный российский мобильный номер.'
    );
    return false;
  }

  input.setCustomValidity('');
  return true;
}

export function initPhoneInput(input) {
  if (!input) return;

  input.addEventListener('input', () => {
    const digits = getPhoneDigits(input.value);

    if (digits.length === 0) {
      input.value = '';
      return;
    }

    input.value = formatRussianPhone(digits);
    input.setCustomValidity('');
  });

  input.addEventListener('blur', () => validatePhoneInput(input));
  input.addEventListener('invalid', () => validatePhoneInput(input));
}
