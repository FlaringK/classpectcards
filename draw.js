// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let getCardNumber = c => {
  switch (parseInt(c)) {
    case 0:
      return "A"
      break;
    case 9:
      return params.cardFont == "cardc" ? "=" : 10
      break;
    case 10:
      return "J"
      break;
    case 11:
      return "Q"
      break;
    case 12:
      return "K"
      break;
  
    default:
      return parseInt(c) + 1
      break;
  }
}

let drawNumber = (c, a) => {
  // Determine card number
  let cardNumber = getCardNumber(c)
  // Draw number
  ctx.fillText(cardNumber, 42.5 * params.numberScale + params.numberX, 20 * params.numberScale + params.numberY)

  // Draw symbol background
  ctx.beginPath();
  ctx.arc(45 * params.numberScale + params.numberX + params.aspNumX, 125 * params.numberScale + params.numberY + params.aspNumY, 30 * params.numberScale, 0, 2 * Math.PI);
  ctx.fill();

  // Draw symbol
  ctx.filter = 'blur(0.5px)';
  ctx.drawImage(aspectImgs[a], 20 * params.numberScale + params.numberX + params.aspNumX, 100 * params.numberScale + params.numberY + params.aspNumY, 50 * params.numberScale, 50 * params.numberScale)
  ctx.filter = 'blur(0)';
}

let setCardSize = () => {
  canvas.style = ""
  canvas.width = params.cardSizeX
  canvas.height = params.cardSizeY
  setDPI(canvas, params.cardDPI)
}

let setAlphaOne = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3]) data[i + 3] = 255
  }
  ctx.putImageData(imageData, 0, 0);
}

// Actually draw card
const drawCard = (c, a) => {

  const newAspectSize = c == 12 ? params.aspectSize * 1.65 : params.aspectSize

  setCardSize()

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = aspColors[a]
  if (c != 12) { // If notmal Card
    // Draw Class
    ctx.drawImage(classImgs[c], (canvas.width - params.classSize) / 2, (canvas.height - params.classSize) / 2, params.classSize, params.classSize)

    // Fill Class with colour
    ctx.globalCompositeOperation = 'source-in'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'source-over'

    // Draw Aspect 
    ctx.drawImage(aspectImgs[a], (canvas.width - newAspectSize) / 2, (canvas.height - newAspectSize) / 2, newAspectSize, newAspectSize)
  } else { // If King
    // Draw Aspect 
    ctx.drawImage(aspectImgs[a], (canvas.width - newAspectSize) / 2, (canvas.height - newAspectSize) / 2, newAspectSize, newAspectSize)

    if (aspects[a] == "space" || aspects[a] == "hope") {
      // Fill Aspect with colour
      ctx.globalCompositeOperation = 'source-in'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'
    }
  }

  // DRAWING TEXT 
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw Card Name
  if (params.doDrawName) {
    ctx.font = `${params.nameSize}px ${params.cardFont}`
    ctx.strokeStyle = 'white'
    ctx.lineWidth = params.nameStroke
    const cardName = params.doNameAspect ? classes[c] + " of " + aspects[a] : "the " + classes[c]
    const ypos = lowNames.includes(classes[c]) ? params.nameY * -1 : params.nameY
    ctx.strokeText(cardName.toUpperCase(), canvas.width / 2, canvas.height / 2 + ypos)
    ctx.fillText(cardName.toUpperCase(), canvas.width / 2, canvas.height / 2 + ypos)
  }

  // Draw Top Number
  ctx.textBaseline = 'top';
  ctx.font = `${70 * params.numberScale}px ${params.cardFont}`
  drawNumber(c, a)

  // Draw Bottom Number
  ctx.save()
  ctx.translate( canvas.width, canvas.height )
  ctx.rotate(Math.PI)
  drawNumber(c, a)
  ctx.restore()

  // Fill background with white
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.globalCompositeOperation = 'source-over'
}

// View card 
let viewCard = () => {
  getOptions()
  drawCard(params.viewClass, params.viewAspect)
}

// Update card when settings change
document.querySelectorAll("#options input, #options select").forEach(e => {
  e.onchange = viewCard
})

// https://stackoverflow.com/questions/14488849/higher-dpi-graphics-with-html5-canvas
function setDPI(canvas, dpi) {
  // Set up CSS size.
  canvas.style.width = canvas.style.width || canvas.width + 'px';
  canvas.style.height = canvas.style.height || canvas.height + 'px';

  // Get size information.
  var scaleFactor = dpi / 96;
  var width = parseFloat(canvas.style.width);
  var height = parseFloat(canvas.style.height);

  // Backup the canvas contents.
  var oldScale = canvas.width / width;
  var backupScale = scaleFactor / oldScale;
  var backup = canvas.cloneNode(false);
  backup.getContext('2d').drawImage(canvas, 0, 0);

  // Resize the canvas.
  var ctx = canvas.getContext('2d');
  canvas.width = Math.ceil(width * scaleFactor);
  canvas.height = Math.ceil(height * scaleFactor);

  // Redraw the canvas image and scale future draws.
  ctx.save()
  ctx.setTransform(backupScale, 0, 0, backupScale, 0, 0);
  ctx.drawImage(backup, 0, 0);
  ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
  ctx.restore()
}

// https://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas
function download(canvas, filename) {

	/// create an "off-screen" anchor tag
	var lnk = document.createElement('a'), e;

	/// the key here is to set the download attribute of the a tag
	lnk.download = filename;

	/// convert canvas content to data-uri for link. When download
	/// attribute is set the content pointed to by link will be
	/// pushed as "download" in HTML5 capable browsers
	lnk.href = canvas.toDataURL();

	/// create a "fake" click-event to trigger the download
  e = document.createEvent("MouseEvents");
  e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

  lnk.dispatchEvent(e);
}

// Download Viewable Card
let downloadView = () => {
  download(canvas, aspects[params.viewAspect] + getCardNumber(params.viewClass) + ".png")
}

let downloadSet = () => {
  let zip = new JSZip();

  aspects.forEach((a, i) => {

    classes.forEach((c, j) => {

      drawCard(j, i)
      const imgUrl = canvas.toDataURL()
      zip.file(a + "/" + a + getCardNumber(j) + ".png", imgUrl.split('base64,')[1], {base64: true})

    })
  })

  zip.generateAsync({type:"blob"}).then(function(content) {
    // see FileSaver.js
    saveAs(content, "classpectCards.zip");
  });

}