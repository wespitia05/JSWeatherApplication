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
    // display the weather data json format in the console
    console.log(data);
    // get the data we want to display
    const {name: city, 
           main: {temp, humidity, feels_like}, 
           weather: [{description, id}],
           coord: {lat, lon},
           wind: {deg, speed}} = data;
    
    // reset the text of the card from a previous city
    card.textContent = "";
    // display the card
    card.style.display = "flex";
    
    // create our constants for each data we plan on displaying
    const cityDisplay = document.createElement("h1");
    const locDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const realFeelDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // change the text content for the html element to our data
    cityDisplay.textContent = city;
    locDisplay.textContent = `${lat}, ${lon}`;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(2)}°F`;
    realFeelDisplay.textContent = `Real Feel: ${((feels_like - 273.15) * (9/5) + 32).toFixed(2)}°F`;
    windDisplay.textContent = `Wind Speed: ${speed}m/s @ ${deg}°`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // apply the styling to each element
    cityDisplay.classList.add("cityDisplay");
    locDisplay.classList.add("locDisplay");
    tempDisplay.classList.add("tempDisplay");
    realFeelDisplay.classList.add("realFeelDisplay");
    windDisplay.classList.add("windDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // add it to the card where we display the elements
    card.appendChild(cityDisplay);
    card.appendChild(locDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(realFeelDisplay);
    card.appendChild(windDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
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