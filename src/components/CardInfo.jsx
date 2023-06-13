import React, { useEffect } from "react";
import styles from "../styles/Card.module.css";

const CardInfo = ({ data, forecastData, formatDate }) => {

  
  let iconClass =
    data.temp < 0
      ? "very.cold.png"
      : data.temp >= 1 && data.temp <= 15
      ? "cold.png"
      : data.temp >= 16 && data.temp <= 25
      ? "mild.png"
      : data.temp > 25
      ? "hot.png"
      : "";

  useEffect(() => {
    if (data.temp < 0) {
      document.body.classList.add(styles.superFrio);
    } else if (data.temp >= 1 && data.temp <= 15) {
      document.body.classList.add(styles.frio);
    } else if (data.temp >= 16 && data.temp <= 25) {
      document.body.classList.add(styles.templado);
    } else if (data.temp > 25) {
      document.body.classList.add(styles.calor);
    }

    return () => {
      document.body.classList.remove(
        styles.superFrio,
        styles.frio,
        styles.templado,
        styles.calor
      );
    };
  }, [data]);

  const translateDescription = (description) => {
    const translations = {
      "clear sky": "Cielo despejado",
      "few clouds": "Pocas nubes",
      "scattered clouds": "Nubes dispersas",
      "broken clouds": "Nubes rotas",
      "overcast clouds": "Nubes cubiertas",
      "light rain": "Lluvia ligera",
      "shower rain": "Chubascos",
      "haze": "Neblina",
      "moderate rain": "Lluvia moderada",
    };
    if (translations.hasOwnProperty(description)) {
      return translations[description];
    }
    return description;
  };

  const currentDate = new Date();
  const dayNumber = currentDate.getDay();
  const dayName = {
    0: "Domingo",
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
  };


  return (
    <>
      <div>
        <div className="flex  justify-center">
          <div className="border-2 rounded-lg p-4 flex-shrink-0 w-2/3  bg-gray-950 bg-opacity-25">
            <div>
              <h1 className="text-7xl text-white">{data.city}</h1>
              <h5 className="text-3xl text-white mt-5">({data.country})</h5>
            </div>

            <div className="-mt-28 flex-col">
              <h4 className="flex justify-end text-white">
                Día {formatDate}
              </h4>
              <h4 className="flex justify-end text-white text-2xl">
                {dayName[dayNumber]}
              </h4>
            </div>

            <img
              className={`${styles.fondo} w-80 mx-auto`}
              src={`./image/iconos/${iconClass}`}
              alt=""
            />

            <div className="text-white text-lg flex justify-evenly mt-12">
              <div className="flex">
                <img
                  src={`http://openweathermap.org/img/w/${data.weather.icon}.png`}
                  alt="icon"
                />
                <h4 className="text-lg ">
                  Tiempo: {translateDescription(data.weather.description)}
                </h4>
              </div>

              <h4>🌡️Sensación térmica: {data.temp}°C</h4>
              <h5>🔥Max: {data.sensacion_max}°C</h5>
              <h5>❄️Min: {data.sensacion_min}°C</h5>
            </div>
          </div>

          <div className="border-2 rounded-lg p-4 max-w-sm bg-gray-950 bg-opacity-25 w-1/2 ml-2 justify-center flex items-center">
            <ul className="text-center space-y-8 py-3">
              <li className="text-white text-lg">
                ☀️Amanecer <p>{data.sunrise} hs</p>
              </li>
              <li className="text-white text-lg">
                🌤️Atardecer <p>{data.sunset} hs</p>
              </li>
              <li className="text-white text-lg">
                💧Húmedad <p>{data.humidity}%</p>
              </li>
              <li className="text-white text-lg">
                💡Visibilidad <p>{data.visibility}km/h</p>
              </li>
              <li className="text-white text-lg">
                🍃Velocidad del viento <p>{data.wind} km/h</p>
              </li>
              <li className="text-white text-lg">
                ☁️Presión atmosférica <p>{data.presion} hPa</p>
              </li>
            </ul>
          </div>
        </div>
        {/* Pronóstico por 4 días */}
        <div className="flex justify-around ">
          {forecastData.map((forecast, index) => (
            <div
              key={index}
              className="px-14 text-center border-2 rounded-lg p-5 max-w-lg bg-gray-950 bg-opacity-25 my-5"
            >
              <h2 className="text-2xl text-white">{formatDate(forecast.dt)}</h2>
              <p className="text-white">
                {translateDescription(forecast.weather[0].description)}
              </p>
              <div className="flex justify-center">
                {" "}
                <img
                  src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                  alt="icon"
                />
              </div>

              <p className="text-white">
                Max: {(forecast.main.temp_max - 273.15).toFixed(1)}°C
              </p>
              <p className="text-white">
                Min: {(forecast.main.temp_min - 273.15).toFixed(1)}°C
              </p>
              <p className="text-white">
                Sensación térmica: {(forecast.main.temp - 273.15).toFixed(1)}
                °C
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardInfo;
