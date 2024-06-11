import jazzicon from '@metamask/jazzicon'

export function generateJazzicon(address, size = 20) {
  const addr = address.slice(2, 10)
  const seed = parseInt(addr, 16)
  const icon = jazzicon(size, seed)

  return icon.outerHTML
}