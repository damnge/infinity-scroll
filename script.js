const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray= [];

// Unspalash API
let count = 5;
const apiKey = 'L3vkAHR1RZx6ycMWbsGzNucWccOq-ssQ3f7WVQKH9ng';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true ;
        count = 30;
    }
}

// helper function to set attributes on DOM Element;

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements for links & photos, add it to DOM
function dispalyPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) =>{
        // create <a> to link to Uunsplash
        const item = document.createElement('a');
        setAttributes(item, {
              href: photo.links.html,
              target: '_blank',
        });
        // Create <img> for photo 
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            tittle: photo.alt_description,
        });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>. then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        dispalyPhotos();
    } catch (error) {
        // catch error here
    }
}

// Check scrolling near the bottom of the page, Load more Photos

window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false;
        getPhotos();
    }
});


// On Load
getPhotos();
