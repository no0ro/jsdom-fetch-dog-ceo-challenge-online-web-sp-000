console.log('%c HI', 'color: firebrick')

// global. populated in loadBreeds()
let breeds = []; 

// "on page load"
document.addEventListener("DOMContentLoaded", () => {
    loadImages(); // load images (Challenge 1)
    loadBreeds(); // load breeds next to images (Challenge 2)
});


// ---------- Challenge 1 - add images to DOM ----------
function loadImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
    fetch(imgUrl) // fetch the images from the URL 
        .then(request => request.json()) 
        .then(results => {results.message.forEach(imgResult => addImage(imgResult)) 
        }); 
}

function addImage(dogPicUrl) {
    let imageContainer = document.getElementById('dog-image-container'); // where
    let newImgEl = document.createElement('img'); // what

    newImgEl.src = dogPicUrl; // extract the physical dog image from the passed in URL
    imageContainer.appendChild(newImgEl); // append image el to DOM
}


// ---------- Challenge 2 - add breeds to an ul on "page load" ----------
// loadBreeds - fetches data from URL > returns as  json > saves data in empty arr vari > passes vari to Functions
function loadBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
    
    fetch(breedUrl)
        .then(request => request.json())
        .then(results => {
            breeds = Object.keys(results.message); // fill breeds array with json data breeds
        
            appendBreedLiAndAddColorListener(breeds); // iterates through arr, appends breeds <li>, & listens for colors
            dropdownListener(); // listener to dropdown menu & cb is filterBreeds()
        });
}

// append a li to ul > then listen on ul for click
// --> called inside loadBreeds() & filterBreeds(letter)
function appendBreedLiAndAddColorListener(breeds) {
     // iterate through breeds arr > create individual breed el, append, then listen for color change on each el
    
     breeds.forEach(breed => {  
        let ul = document.getElementById("dog-breeds"); // ul aka ulBreedContainer
        let li = document.createElement("li");  // li aka newBreedLi

        li.innerText = breed;// add breed to Li as inner text 
        ul.appendChild(li); // append li to ul

        li.addEventListener('click', changeColorEvent); // while in forEach, add listener 
        // ^ add event here bc need reference to the li variable | Challenge 3
    });
} 


// cb, changes <li> text & bullet point color
// --> called inside appendBreedLiAndAddColorListener(breeds)
function changeColorEvent(e) {
    e.target.style.color = 'red';    
}


// ----- Challenge 4 - filter dog breeds via drop down, and via first letter ------


// Listen on dropdown menu, pull users letter selection's value, pass that letter to filter fn
// --> called inside loadBreeds()
function dropdownListener(){
    let dropdown = document.getElementById("breed-dropdown"); // grab dropdown menu

    dropdown.addEventListener('change', function (e) {
        let userLetter =  e.target.value; // pulled "a" from  <option value="a">a</option>
        filterBreeds(userLetter); // While in listener - pass in the string "letter" to filter breeds arr by 
    });
}


// grab ul -- remove all current li, & add the new filtered li in on last line 
// --> called inside loadBreeds() & filterBreeds(letter)
function filterBreeds(letter){
    let ul = document.getElementById('dog-breeds'); // empty ul in HTML file
    let filteredBreeds = breeds.filter( breed =>  breed.startsWith(letter)); // filter breeds w/ dropdown letter. 
    // ^^ NOTE: non-destructive. breeds arr is still in tact. we're just going to override whats 
        // displayed in the DOM by saving filter to a vari then passing it to our appendLi fn below
    
    removeAllChildNodes(ul); // remove nodes displayed in DOM (doesnt delete from actual breeds arr items though!)
    appendBreedLiAndAddColorListener(filteredBreeds); // now that '#dog-breeds' ul is empty, pass in the filteredBreeds &run fn
}


// remove ALL li from passed in ul
function removeAllChildNodes(parent) {
    // while the parent node has a .firstChild, delete that child. when no more children, return
    // NOTE: PASSED IN THE PARENT!! aka ul!! 

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
