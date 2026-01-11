// ---------- WEATHER APP FUNCTIONALITY ---------- //

// use querySelector bc its a class, not an id
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "0b27dee62b5909ebbbf9788a2e85e2b2";

// event listener for when we press the submit button
weatherForm.addEventListener("submit", async event => {
    
});

// this function will get the city inputted and return data
async function getWeatherData(city) {

}

// this function will gather specific data and display it
function displayWeatherInfo(data) {

}

// this function will get the specific emoji for the weather id returned
function getWeatherEmoji(weatherId) {

}

// this function will display any potential error messages
function displayError(message) {
    // create the paragraph element where the error message will be displayed
    const errorDisplay = document.createElement("p");
    // change the text content of that paragraph to that message
    errorDisplay.textContent = message;
    // take errorDisplay and add the css class list to it
    errorDisplay.classList.add("errorDisplay");

    // reset card context to nothing (if something was previously there)
    card.textContent = "";
    card.style.display = "flex";
    // append the error message to the card
    card.appendChild(errorDisplay); 
}