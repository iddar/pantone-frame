import * as Vibrant from 'node-vibrant'
import html2canvas from 'html2canvas'

import { download } from './tools'

import {
  rgbToHex,
  findColor
} from './tools'

const box = document.getElementById('colorbox')
const pantonebox = document.getElementById('pantonebox')
const photo = document.getElementById('photo')
const nameBox = document.querySelector('.colorName')
const container = document.querySelector(".container")
const link = document.querySelector(".link")
const file = document.querySelector(".file")

function getVibrant () {
  return Vibrant.from(photo).getPalette()
    .then(({Vibrant}) => Vibrant._rgb)
}

async function init () {
  const vibrant = await getVibrant()
  let [r, g, b] = vibrant
  let color = findColor({r, g, b})
  box.style.backgroundColor = `rgb(${r},${g},${b})`
  pantonebox.style.backgroundColor = `#${color.hex}`
  nameBox.innerHTML = color.name

  const opts = {
    width: container.clientWidth,
    height: container.clientHeight + 40,
    backgroundColor: null,
    logging: false
  }


  html2canvas(container, opts)
    .then(canvas => download(canvas, link));

}

photo.onload = init

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      photo.src = e.target.result
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}

file.addEventListener('change', ({target}) => readURL(target), false)



// https://www.instagram.com/pantonegarden/
// https://github.com/Margaret2/pantone-colors
// https://stackoverflow.com/questions/9018016/how-to-compare-two-colors-for-similarity-difference

// {
//     "11-0103": {
//       "name": "egret",
//       "hex": "f3ece0"
//     },
//     "11-0602": {
//       "name": "snow-white",
//       "hex": "f2f0eb"
//     },
//     "11-0601": {
//       "name": "bright-white",
//       "hex": "f4f5f0"
//     },
//     "11-4201": {
//       "name": "cloud-dancer",
//       "hex": "f0eee9"
//     },
// ....    
