// ---------- WEATHER APP FUNCTIONALITY ---------- //

// use querySelector bc its a class, not an id
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "0b27dee62b5909ebbbf9788a2e85e2b2";

// event listener for when we press the submit button
weatherForm.addEventListener("submit", async event => {
    // submit forms tend to refresh after pressing the button, this will prevent that
    event.preventDefault();
    // store the city we input into the "city" object
    const city = cityInput.value;

    // if a city is inputted correctly, continue
    if(city) {
        // try block in case of any potential failures
        try {
            // wait for the getWeatherData to return data
            const weatherData = await getWeatherData(city);
            // pass the data into the displayWeatherInfo function
            displayWeatherInfo(weatherData);
        }
        // catch any errors and display them
        catch(error) {
            console.error(error);
            displayError(error);
        }
    }
    // if not inputted correctly, display error message
    else {
        displayError("Please Enter A City");
    }
});

// this function will get the city inputted and return data
async function getWeatherData(city) {
    // this url is what we will pas to get data on the city inputted
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    // response fetches the url for the specified city inputted
    const response = await fetch(apiUrl);
    // display in the console if we got back the proper data for the inputted city
    console.log(response);

    // if the response is not ok, display the error message
    if(!response.ok) {
        throw new Error("Could Not Fetch Weather Data");
    }

    // at the end of this function, return the response in a json object
    return await response.json();
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