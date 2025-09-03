import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import {
  Container,
  ChangeThemeContainer,
  ThemeButton,
  ThemeText,
  WeatherContainer,
  LocationPermissionContainer,
  Heading,
  Paragraph,
  LocationButton,
} from "./UIComponents";
import { FaLocationCrosshairs } from "react-icons/fa6";

import weather from "./weather.json";
import dayjs from "dayjs";
import { AxiosContext } from "./AxiosContext";
import data from "./data.json";

export default function ProfileContainer() {
  const { localTheme, onThemeChange, themes, themeIndex } =
    useContext(ThemeContext);
  console.log(localTheme);

  const { weatherData, getWeatherAndLocationInformation, address, coords } =
    useContext(AxiosContext);
  console.log(weatherData);

  const changeTheme = themes[themeIndex].gradient;
  const themeName = themes[themeIndex].name;

  console.log(address);

  return (
    <Container background={changeTheme}>
      <ChangeThemeContainer>
        <ThemeButton onClick={onThemeChange}>Change Theme</ThemeButton>
        <ThemeText className="theme-text" htmlFor="">
          {themeName}
        </ThemeText>
      </ChangeThemeContainer>
      <WeatherContainer>
        <div className="weather-widget-container">
          {!weatherData ? (
            <>
              <LocationPermissionContainer>
                <Heading>
                  Turn on location to unlock personalized insights.
                </Heading>
                <Paragraph>
                  By enabling location data, you'll receive tailored chat
                  responses and real-time weather updates based on where you
                  are—making your experience more relevant and useful.
                </Paragraph>
                <LocationButton onClick={getWeatherAndLocationInformation}>
                  Get Location
                </LocationButton>
              </LocationPermissionContainer>
            </>
          ) : (
            <>
              <div className="weather-main-info">
                <div className="weather-temp-group">
                  <p className="weather-temp">{weatherData?.current.temp}°</p>
                  <p className="weather-feels-like">
                    Feels like {weatherData?.current.feels_like}°
                  </p>
                </div>
                <div className="weather-description">
                  <p>{weatherData?.current.weather[0].description}</p>
                  <img
                    src={`https://rodrigokamada.github.io/openweathermap/images/${weatherData?.current.weather[0].icon}_t.png`}
                    alt={weatherData?.current.weather[0].description}
                  />
                </div>
              </div>
              <p className="weather-date">
                {dayjs
                  .unix(weatherData?.current.dt)
                  .format("MMMM D, YYYY h:mm A")}
              </p>
              <button
                style={{
                  textAlign: "left",
                  align: "left",
                  background: "none",
                  border: "none",
                }}
                onClick={getWeatherAndLocationInformation}
              >
                <FaLocationCrosshairs size="28px" />
              </button>
              <p className="weather-date">{address}</p>
            </>
          )}
        </div>
      </WeatherContainer>
    </Container>
  );
}
