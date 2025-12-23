"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * WeatherWidget - A complete, self-contained weather component for Next.js
 *
 * @param {string} apiKey - Your OpenWeatherMap API key (required)
 * @param {string} defaultCity - Default city to display (default: "lavagna")
 * @param {string[]} predefinedCities - List of quick-select cities
 * @param {string} className - Optional CSS class for wrapper
 *
 * Example usage:
 * <WeatherWidget
 *   apiKey="your-api-key-here"
 *   defaultCity="London"
 *   predefinedCities={["New York", "London", "Tokyo"]}
 * />
 */
export default function WeatherWidget({
  apiKey,
  defaultCity = "lavagna",
  predefinedCities = ["New York", "London", "Tokyo", "Paris", "Sydney"],
  className = "",
}) {
  const [cityInput, setCityInput] = useState(defaultCity);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();

        if (data.cod === 200) {
          setWeatherData(data);
          setCityInput(data.name);
        } else {
          setError(data.message || "City not found");
        }
      } catch (err) {
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    if (apiKey) {
      getData();
    }
  }, [triggerFetch, cityInput, apiKey]);

  const handleSearchChange = (value) => {
    setCityInput(value);
    const timer = setTimeout(() => {
      setTriggerFetch(!triggerFetch);
    }, 500);
    return () => clearTimeout(timer);
  };

  const changeSystem = () => {
    setUnitSystem(unitSystem === "imperial" ? "metric" : "imperial");
  };

  // Utility functions
  const ctoF = (c) => (c * 9) / 5 + 32;
  const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);
  const kmToMiles = (km) => (km / 1.609).toFixed(1);

  const degToCompass = (num) => {
    const val = Math.round(num / 22.5);
    const arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  };

  const getWindSpeed = (unitSystem, windInMps) =>
    unitSystem === "metric" ? windInMps : mpsToMph(windInMps);

  const getVisibility = (unitSystem, visibilityInMeters) =>
    unitSystem === "metric"
      ? (visibilityInMeters / 1000).toFixed(1)
      : kmToMiles(visibilityInMeters / 1000);

  const getTime = (unitSystem, timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    if (unitSystem === "imperial") {
      hours = hours % 12 || 12;
    }
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const getAMPM = (unitSystem, timestamp, timezone) => {
    if (unitSystem === "imperial") {
      const date = new Date((timestamp + timezone) * 1000);
      const hours = date.getUTCHours();
      return hours >= 12 ? "PM" : "AM";
    }
    return "";
  };

  const getFullDate = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    const day = date.getUTCDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day.toString().padStart(2, "0")} ${month} ${year}`;
  };

  const getWeekDay = (weatherData) => {
    const date = new Date((weatherData.dt + weatherData.timezone) * 1000);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getUTCDay()];
  };

  if (!apiKey) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Error: API key is required
      </div>
    );
  }

  if (loading) {
    return <LoadingScreen loadingMessage="Loading weather data..." />;
  }

  if (error) {
    return (
      <ErrorScreen errorMessage={error}>
        <SearchInput
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setTriggerFetch(!triggerFetch)}
        />
      </ErrorScreen>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className={`weather-widget ${className}`}>
      <style jsx>{`
        .weather-widget {
          display: grid;
          grid-template-columns: 1fr 2fr;
          max-width: 1200px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 8px 32px 0 rgba(83, 89, 179, 0.37);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          border-radius: 10px;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        .weather-widget:hover {
          box-shadow: 9px 18px 32px 9px rgba(83, 89, 179, 0.57);
        }
        .main-card {
          text-align: center;
          padding: 30px;
          background-color: rgb(105, 215, 219);
        }
        .main-card:hover {
          box-shadow: 9px 18px 32px 9px rgba(83, 89, 179, 0.57);
        }
        .location {
          font-size: 48px;
          margin-bottom: 10px;
        }
        .description {
          font-size: 24px;
          margin-bottom: 10px;
          text-transform: capitalize;
        }
        .temperature {
          font-size: 60px;
          min-width: 200px;
          display: inline-block;
        }
        .content-box {
          background-color: rgb(105, 215, 219);
          padding: 30px;
        }
        .header {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .datetime-wrapper {
          display: flex;
          align-items: center;
          border-radius: 5px;
        }
        .datetime-wrapper:hover {
          box-shadow: 9px 18px 32px 9px rgba(83, 89, 179, 0.57);
        }
        .datetime {
          font-size: 26px;
          margin-bottom: 10px;
        }
        .search-container {
          position: relative;
        }
        .search-input {
          width: 100%;
          padding: 5px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .search-input:hover {
          box-shadow: 9px 18px 32px 9px rgba(83, 89, 179, 0.57);
        }
        .dropdown {
          position: absolute;
          width: 100%;
          max-height: 150px;
          overflow-y: auto;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          z-index: 1;
          display: none;
        }
        .search-container:hover .dropdown {
          display: block;
        }
        .dropdown-item {
          padding: 5px;
          cursor: pointer;
        }
        .dropdown-item:hover {
          background-color: #f0f0f0;
        }
        .metrics-box {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .metric-card {
          background: rgba(240, 233, 176, 0.95);
          padding: 20px;
          text-align: right;
          border-radius: 15px;
          border: 1px solid rgba(83, 89, 179, 0.57);
          min-height: 160px;
          display: flex;
          flex-direction: column;
        }
        .metric-card:hover {
          box-shadow: 9px 18px 32px 9px rgba(83, 89, 179, 0.57);
        }
        .metric-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          align-items: center;
        }
        .metric-content h1 {
          min-width: 60px;
          margin: 0;
          font-size: 1.5rem;
          line-height: 1.5;
        }
        .metric-unit {
          font-size: 0.8rem;
          margin-left: 4px;
        }
        .unit-switch-wrapper {
          text-align: right;
        }
        .unit-switch {
          display: inline-block;
          margin: 0 10px;
          cursor: pointer;
          border: 1px solid blue;
          background-color: #f0f0f0;
          padding: 5px 10px;
          border-radius: 5px;
          min-width: 120px;
          text-align: center;
        }
        .unit-switch.active {
          color: blue;
          background: rgb(240, 233, 176, 0.95);
        }
        .unit-switch.inactive {
          color: black;
        }
        .loading-screen,
        .error-screen {
          text-align: center;
          padding: 40px;
          max-width: 400px;
          margin: 0 auto;
        }
        @media only screen and (max-width: 950px) {
          .weather-widget {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin: 20px auto;
          }
        }
        @media only screen and (max-width: 600px) {
          .weather-widget {
            margin: 0;
            border-radius: 0;
          }
          .metrics-box {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media only screen and (max-width: 520px) {
          .header {
            grid-template-columns: 1fr;
            place-items: center;
          }
        }
        @media only screen and (max-width: 475px) {
          .metrics-box {
            grid-template-columns: 1fr;
          }
          .metric-content {
            grid-template-columns: 1fr 2fr;
          }
          .unit-switch-wrapper {
            text-align: center;
          }
        }
        @media only screen and (max-width: 335px) {
          .unit-switch-wrapper {
            display: grid;
            grid-template-columns: 1fr;
          }
          .unit-switch {
            margin: 10px 0;
          }
        }
      `}</style>

      <div className="main-card">
        <h1 className="location">
          {weatherData.name}, {weatherData.sys.country}
        </h1>
        <p className="description">{weatherData.weather[0].description}</p>
        <Image
          width="200"
          height="200"
          src={`/icons/${weatherData.weather[0].icon}.svg`}
          alt="weather icon"
        />
        <h1 className="temperature">
          {unitSystem === "metric"
            ? Math.round(weatherData.main.temp)
            : Math.round(ctoF(weatherData.main.temp))}
          °{unitSystem === "metric" ? "C" : "F"}
        </h1>
        <p>
          Feels like{" "}
          {unitSystem === "metric"
            ? Math.round(weatherData.main.feels_like)
            : Math.round(ctoF(weatherData.main.feels_like))}
          °{unitSystem === "metric" ? "C" : "F"}
        </p>
      </div>

      <div className="content-box">
        <div className="header">
          <div className="datetime-wrapper">
            <div className="datetime">
              {`${getWeekDay(weatherData)},
                ${getFullDate(weatherData.dt, weatherData.timezone)},
                ${getTime(unitSystem, weatherData.dt, weatherData.timezone)}
                ${getAMPM(unitSystem, weatherData.dt, weatherData.timezone)}`}
            </div>
          </div>
          <div className="search-container">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="search-input"
              placeholder="Search or select a city..."
            />
            <div className="dropdown">
              {predefinedCities.map((city) => (
                <div
                  key={city}
                  className="dropdown-item"
                  onClick={() => {
                    setCityInput(city);
                    setTriggerFetch(!triggerFetch);
                  }}
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="metrics-box">
          <MetricCard
            title="Humidity"
            iconSrc="/icons/humidity.png"
            metric={weatherData.main.humidity}
            unit="%"
          />
          <MetricCard
            title="Wind speed"
            iconSrc="/icons/wind.png"
            metric={getWindSpeed(unitSystem, weatherData.wind.speed)}
            unit={unitSystem === "metric" ? "m/s" : "m/h"}
          />
          <MetricCard
            title="Wind direction"
            iconSrc="/icons/compass.png"
            metric={degToCompass(weatherData.wind.deg)}
          />
          <MetricCard
            title="Visibility"
            iconSrc="/icons/binocular.png"
            metric={getVisibility(unitSystem, weatherData.visibility)}
            unit={unitSystem === "metric" ? "km" : "miles"}
          />
          <MetricCard
            title="Sunrise"
            iconSrc="/icons/sunrise.png"
            metric={getTime(
              unitSystem,
              weatherData.sys.sunrise,
              weatherData.timezone
            )}
            unit={getAMPM(
              unitSystem,
              weatherData.sys.sunrise,
              weatherData.timezone
            )}
          />
          <MetricCard
            title="Sunset"
            iconSrc="/icons/sunset.png"
            metric={getTime(
              unitSystem,
              weatherData.sys.sunset,
              weatherData.timezone
            )}
            unit={getAMPM(
              unitSystem,
              weatherData.sys.sunset,
              weatherData.timezone
            )}
          />
        </div>

        <div className="unit-switch-wrapper">
          <p
            className={`unit-switch ${
              unitSystem === "metric" ? "active" : "inactive"
            }`}
            onClick={changeSystem}
          >
            Metric System
          </p>
          <p
            className={`unit-switch ${
              unitSystem === "metric" ? "inactive" : "active"
            }`}
            onClick={changeSystem}
          >
            Imperial System
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function MetricCard({ title, iconSrc, metric, unit }) {
  return (
    <div className="metric-card">
      <p>{title}</p>
      <div className="metric-content">
        <Image width="100" height="100" src={iconSrc} alt="metric icon" />
        <div>
          <h1>
            {metric} {unit && <span className="metric-unit">{unit}</span>}
          </h1>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen({ loadingMessage }) {
  return (
    <div className="loading-screen">
      <h1>{loadingMessage}</h1>
    </div>
  );
}

function ErrorScreen({ errorMessage, children }) {
  return (
    <div className="error-screen">
      <h1>{errorMessage}</h1>
      {children}
    </div>
  );
}

function SearchInput({ value, onChange, onKeyDown }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Enter city name..."
      style={{
        padding: "10px",
        fontSize: "16px",
        width: "100%",
        marginTop: "20px",
      }}
    />
  );
}
