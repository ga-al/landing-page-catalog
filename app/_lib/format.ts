export function formatPrice(amount: number) {
  return `${amount.toLocaleString("ru-RU")} ₽`;
}

export function formatDuration(days: number) {
  const mod10 = days % 10;
  const mod100 = days % 100;

  if (mod10 === 1 && mod100 !== 11) return `${days} рабочий день`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${days} рабочих дня`;
  }

  return `${days} рабочих дней`;
}
