export function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
