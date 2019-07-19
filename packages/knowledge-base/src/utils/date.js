export function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateTime(dateValue) {
  return new Date(dateValue).toLocaleString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
