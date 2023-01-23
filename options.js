// ===

let params = {}

// cardSizeX|cardSizeY|cardDPI|cardFont|classSize|aspectSize|numberScale|numberX|numberY|doDrawName|doNameAspect|nameY|nameSize|nameStroke|viewAspect|viewClass

// ===

// Classes
const classes = ["heir", "witch", "seer", "mage", "knight", "page", "rogue", "thief", "bard", "maid", "prince", "sylph", "aspect"]
const classImgs = []

const lowNames = ["mage", "page", "thief", "prince", "aspect"]

// Aspects
const aspects = ["breath", "blood", "time", "space", "light", "void", "mind", "heart", "life", "doom", "hope", "rage"]
const aspColors = ["#4379e6", "#3e1601", "#b70d0e", "#000000", "#f0840c", "#104EA2", "#00923d", "#55142a", "#A49787", "#306800", "#FFDE55", "#520c61"]
const aspectImgs = []

// Classes
classes.forEach((className, i) => {
  // Load Images
  const img = new Image(500, 500)
  img.src = `./classes/${className}.svg`
  classImgs.push(img)

  document.getElementById("hidden").appendChild(img)
  // Add view options
  const option = document.createElement("option")
  option.innerText = className
  option.value = i
  document.getElementById("viewClass").appendChild(option)
})

// Aspects
aspects.forEach((aspectName, i) => {
  const img = new Image()
  img.src = `./aspects/${aspectName}.svg`
  aspectImgs.push(img)

  document.getElementById("hidden").appendChild(img)
  // Add view options
  const option = document.createElement("option")
  option.innerText = aspectName
  option.value = i
  document.getElementById("viewAspect").appendChild(option)
})

// Get options

let getOptions = () => {
  //Generate options object
  document.querySelectorAll(".opt input, .opt select").forEach(input => {
    switch (input.type) {
      case "checkbox":
        params[input.id] = input.checked
        break;
      case "number":
        params[input.id] = parseFloat(input.value)
        break;
      default:
        params[input.id] = input.value
        break;
    }
  })

  console.log(params)
}