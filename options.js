// ===

let cardSizeX = 559
let cardSizeY = 871
let cardDPI = 300

let classSize = 1800
let aspectSize = 600

let numberScale = 3
let numberX = 200
let numberY = 200

let doDrawName = true 
let doNameAspect = true
let nameY = 0
let nameSize = 120
let nameStroke = 20

let viewAspect = 0
let viewClass = 0

// ===

// Classes
const classes = ["heir", "witch", "seer", "mage", "knight", "page", "rogue", "thief", "maid", "bard", "sylph", "prince"]
const classImgs = []

// Aspects
const aspects = ["breath", "blood", "time", "space", "light", "void", "mind", "heart", "life", "doom", "hope", "rage"]
const aspColors = ["#4379e6", "#3e1601", "#b70d0e", "#000000", "#f0840c", "#033476", "#00923d", "#55142a", "#ccc3b4", "#173220", "#ffe094", "#520c61"]
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
  cardSizeX = document.getElementById("cardSizeX").value
  cardSizeY = document.getElementById("cardSizeY").value
  cardDPI = document.getElementById("cardDPI").value

  classSize = document.getElementById("classSize").value
  aspectSize = document.getElementById("aspectSize").value

  numberScale = parseFloat(document.getElementById("numberScale").value)
  numberX = parseFloat(document.getElementById("numberX").value)
  numberY = parseFloat(document.getElementById("numberY").value)

  doDrawName = document.getElementById("doDrawName").checked
  doNameAspect = document.getElementById("doNameAspect").checked
  nameY = parseFloat(document.getElementById("nameY").value)
  nameSize = parseFloat(document.getElementById("nameSize").value)
  nameStroke = parseFloat(document.getElementById("nameStroke").value)

  viewAspect = parseInt(document.getElementById("viewAspect").value)
  viewClass = parseInt(document.getElementById("viewClass").value)
}