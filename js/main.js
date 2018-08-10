/* WATS 3020 Image Maker Code */

//////////////////////////////////////////////////
// ImageMaker Class Definition               /////
////////////////////////////////////////////////////////////////////////
// This class is used to manage the image manipulation and prep on    //
// the page. It is instantiated when the page is loaded, and it       //
// handles all the logic of updating the image preview with the data  //
// submitted by users via the image maker form.                       //
////////////////////////////////////////////////////////////////////////

class ImageMaker {
    constructor(){
        // When this class is instantiated, the `constructor()` method is executed.
        // Set up attributes that point to the HTML elements we wish to work with.

        // Selected the `#image-preview` div using any document selector method.
        this.imagePreview = document.getElementById('image-preview');

        // Created a new `<p>` element called `this.topText`
        this.topText = document.createElement('p');
        // Added a `class` attribute to `this.topText` that contains the classname "top-text".
        this.topText.setAttribute('class', 'top-text');
        // Appended `this.topText` as a child element to `this.imagePreview`
        this.imagePreview.appendChild(this.topText);

        // Created a new `<p>` element called `this.bottomText`
        this.bottomText = document.createElement('p');
        // Added a `class` attribute to `this.bottomText` that contains the classname "bottom-text".
        this.bottomText.setAttribute('class', 'bottom-text');
        // Append `this.bottomText` as a child element to `this.imagePreview`
        this.imagePreview.appendChild(this.bottomText);
        // This class also needs to use the form fields to read user input. Set
        // those up for future use, too.

        // Select the `input` element with the `name` attribute "backgroundImage"
        this.backgroundInput = document.querySelector('select[name="backgroundImage"]');

        // Select the `input` element with the `name` attribute "topText"
        this.topTextInput = document.querySelector('input[name="topText"]');

        // Select the `input` element with the `name` attribute "bottomText"
        this.bottomTextInput = document.querySelector('input[name="bottomText"]');
        
        
        // NOTE: If you add additional form fields to modify other aspects of
        // the image, then you will need to make attributes for each of those
        // elements here.
///////////////////////////////////////////////////////////////////////////////////////////////////        
        // Attempting to change text color. Created a new `<p>` element called `this.textColor`
        this.textColor = document.createElement ('p');
        this.textColor.setAttribute('class', 'text-color');
        // Appended `this.textColor` as a child element to `this.imagePreview`
        this.imagePreview.appendChild(this.textColor);
        // Selected the `input` element with the `name` attribute "textColor"
        this.textColorInput = document.querySelector('input[name="textColor"]');
    }
    drawPreview(){
        // This function is called whenever a user changes one of the form fields
        // and whenever an image is generated for download. This function must
        // update the style attributes and innerHTML content of the HTML
        // elements selected in the `constructor()` of this class in order to
        // update `this.imagePreview`.

        // Updated the `background-image` CSS property for `this.imagePreview`.
        this.imagePreview.style.backgroundImage = `url(images/${this.backgroundInput.value})`;
        // Updated the `innerHTML` of `this.topText`.
        this.topText.innerHTML = this.topTextInput.value;
        // Updated the `innerHTML` of `this.bottomText`
        this.bottomText.innerHTML = this.bottomTextInput.value;
       

    }
    downloadImage(){
        this.drawPreview();
        generateImage();
    }
}

let imageMaker = new ImageMaker();

//////// Trying to get <input type = "color"> to work./////////
window.addEventListener("load", startup, false);
function startup() {
  textColor = document.querySelector("#textColor");
  textColor.value = defaultColor;
  textColor.addEventListener("input", updateFirst, false);
  textColor.addEventListener("change", updateAll, false);
  textColor.select();
}
function updateFirst(event) {
  var p = document.querySelector("p");

  if (p) {
    p.style.color = event.target.value;
  }
}function updateAll(event) {
  document.querySelectorAll("p").forEach(function(p) {
    p.style.color = event.target.value;
  });
}
//////////////////////////////////////////////////////

//////////////////////////////////////////////////
// Do Not Edit Below This Line               /////
////////////////////////////////////////////////////////////////////////

// This function uses the `domtoimage` module to render an image of the
// `#image-preview` element and prompts the user to download the created image.
// It is possible to use the `height` and `width` parameters to alter the size
// of the rendered image.
function generateImage(elementID="image-preview", height="800px", width="1280px"){
    let htmlTemplate = document.getElementById(elementID);
    htmlTemplate.style.height = height;
    htmlTemplate.style.width = width;
    let imageName = "image_" + Date.now();

    // Generate image and prompt download for user.
    domtoimage.toJpeg(htmlTemplate, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = imageName;
            link.href = dataUrl;
            link.click();
        });
}


// This function creates event listeners for each every form field added to
// the image maker form as well as the submit button that generates an image
// for download. New form inputs can be created and will automatically have
// a "change" listener added to them.
//
// The form field listeners look for a "change" event and call the
// `imageMaker.drawPreview()` method.
//
// The submit listener on the form interrupts the regular form processing of the
// browser and calls the `imageMaker.downloadImage()` method.
function applyEventListeners(){
    let inputs = document.querySelectorAll('input, select, textarea');
    for (input of inputs){
        input.addEventListener("change", function(event){
            imageMaker.drawPreview();
        })
    }
    let imageForm = document.querySelector('form');
    imageForm.addEventListener('submit', function(event){
        event.preventDefault();
        imageMaker.downloadImage();
    })
}


// Apply event listeners on page load.
applyEventListeners();
