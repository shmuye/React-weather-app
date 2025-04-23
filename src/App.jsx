import React, { useState } from "react";
import axios from "axios";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "157912b149c8dc65bdd77949ff6e9bcb"; // Replace with your real API key

  const getWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch {
      setWeather(null);
      setError("City not found or API error.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Weather App</h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          onClick={getWeather}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Get Weather
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {weather && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">{weather.name}, {weather.sys.country}</h2>
            <p className="text-4xl mt-2">{weather.main.temp}&deg;C</p>
            <p className="text-lg text-gray-600 mt-2 capitalize">{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
