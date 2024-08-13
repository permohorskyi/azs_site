interface RGB {
  r: number
  g: number
  b: number
}

export const isColorValid = (color: string): boolean => {
  const [hash, ...chars] = color
  if (hash !== "#") return false
  return /^[0-9A-F]{6}$/u.test(chars.join(""))
}

export const getColorRGB = (color: string): RGB => {
  // strip #
  const c = color.slice(1)
  // convert rrggbb to decimal
  const rgb = Number.parseInt(c, 16)
  // extract red, green, blue
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff

  return { r, g, b }
}

const componentToHex = (c: number) => {
  const hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}
export const getColorHash = ({ r, g, b }: RGB): string => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export const getColorCSS = (color: string): string => {
  const { r, g, b } = getColorRGB(color)
  return `rgb(${r}, ${g}, ${b})`
}
