import http from "http";


// Your OpenWeatherMap API Key
const API_KEY = '72920b71bccac332ddfa64d1d1d2eb96';

// Coordinates for Bucharest (example)
const LAT = '44.439663';
const LON = '26.096306';

// Function to fetch weather data
async function getWeatherData() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { error: error.message }; // Return an error object
  }
}

// Create HTTP server
http.createServer(async (req, res) => {
  // Fetch weather data
  const weatherData = await getWeatherData();

  // Prepare response
  const htmlResponse = weatherData.error

    ? `<h1 style="color: red;">Error: ${weatherData.error}</h1>`
    : `  <div> 
<h1 style="color: blue;">Weather in ${weatherData.name}</h1>
       <p>Temperature: ${(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
       <p>Weather: ${weatherData.weather[0].description}</p> 
        </div>`;

  // Send response
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(htmlResponse);
  res.end();
}).listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
}); //the server object listens on port 8080