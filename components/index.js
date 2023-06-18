// Constants
const API_KEY = 'e433fde7be9e5bd4105836a6101b6f90'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=london'; // Replace with the API's base URL

// DOM elements
const form = document.querySelector('#weather-form');
const input = document.querySelector('#city-input');
const weatherContainer = document.querySelector('#weather-container');
const errorContainer = document.querySelector('#error-container');

// Event listener for the form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  const city = input.value.trim(); // Get the entered city name

  // Fetch weather data from the API
  fetchWeatherData(city)
    .then((data) => {
      displayWeather(data); // Display weather information
    })
    .catch((error) => {
      displayError(error); // Display error message
    });
});

// Function to fetch weather data from the API
function fetchWeatherData(city) {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Weather data not available.');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

// Function to display weather information
function displayWeather(data) {
  weatherContainer.innerHTML = ''; // Clear previous weather data

  // Extract the required information from the API response
  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;

  // Create DOM elements to display the weather information
  const cityElement = document.createElement('h2');
  cityElement.textContent = cityName;

  const temperatureElement = document.createElement('p');
  temperatureElement.textContent = `Temperature: ${temperature}°C`;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = `Description: ${description}`;

  // Append the elements to the weather container
  weatherContainer.appendChild(cityElement);
  weatherContainer.appendChild(temperatureElement);
  weatherContainer.appendChild(descriptionElement);
}

// Function to display error message
function displayError(error) {
  errorContainer.textContent = error.message;
}
