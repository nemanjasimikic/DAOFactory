export const addressFormat = (val, start = 6, end = 4) => {
  if (!val) return ''
  return (
    val.toString().substr(0, start) +
    '...' +
    val
      .toString()
      .substr(val.toString().length - end, val.toString().length - 1)
  )
}
