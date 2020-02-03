module.exports = [
  'none',
  '0 0 5px 0 rgba(0, 0, 0, 0.05), 0 2px 5px 0 rgba(0, 0, 0, 0.05)',
  // Material ui requires  25 elevations
  ...new Array(23).fill(
    '0 0 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)'
  ),
]
