export function replaceBetween(string, start, end, what) {
  return string.substring(0, start) + what + string.substring(end)
}

export function insertByIndex(value: string, index: number, string: string) {
  if (index > 0) {
    return value.substring(0, index) + string + value.substring(index, value.length)
  }

  return string + value
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}