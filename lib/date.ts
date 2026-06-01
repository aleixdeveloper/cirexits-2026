export function formatDate(date: Date | string | null) {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('ca-CA', {
    timeZone: 'Europe/Berlin', // UTC+2 during daylight savings
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
}

export function getTimeAndDate(date: Date | string | null) {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const time = new Intl.DateTimeFormat('ca-ES', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);

  const dayMonth = new Intl.DateTimeFormat('ca-ES', {
    day: 'numeric',
    month: 'long'
  }).format(dateObj);

  return `a les ${time} (${dayMonth})`;
}
