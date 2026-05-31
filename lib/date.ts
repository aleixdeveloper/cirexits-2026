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
