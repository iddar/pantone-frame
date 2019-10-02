import colors from './pantone-numbers.json'

export const getJson = async url => fetch(url).then(r => r.json())

export function componentToHex(c) {
  var hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

// thanks https://stackoverflow.com/a/5624139
export function rgbToHex({r, g, b}) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b)
}

// thanks https://css-tricks.com/converting-color-spaces-in-javascript/
export function hexToRGB(h) {
  let r = 0, g = 0, b = 0
  r = parseInt("0x" + h[0] + h[1], 16)
  g = parseInt("0x" + h[2] + h[3], 16)
  b = parseInt("0x" + h[4] + h[5], 16)
  return { r, g, b }
}

export function getColorDistance(color1, color2) {
  let { r, g, b } = hexToRGB(color2)
  let deltaR = Math.abs(r-color1.r)^2
  let deltaG = Math.abs(g-color1.g)^2
  let deltaB = Math.abs(b-color1.b)^2
  let distance = Math.sqrt(deltaR + deltaG+ deltaB)
  return distance
}

export function findColor (color) {
  let match = Object.keys(colors).find(key => {
    return colors[key]['hex'] === rgbToHex(color)
  })

   if (!match) {
    let list = Object.keys(colors).reduce((obj, el) => {
      let distance = getColorDistance(color, colors[el]['hex'])
      return {
        ...obj,
        [distance]: {
          ...colors[el]
        }
      }
    }, {})

    let idx = Math.min(...Object.keys(list))
    match = list[idx]
   } else {
    match = colors[match]
   }

  return match
}

export function download (canvas, link){
  link.download = 'filename.png';
  link.href = canvas.toDataURL()
  console.log('done')
}
