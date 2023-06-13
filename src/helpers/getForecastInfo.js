import axios from "axios";

const DEFAULT_LAT = "-34.5838";
const DEFAULT_LON = "-60.9433";

const getForecastInfo = async (lat, lon) => {
  lat = lat || DEFAULT_LAT;
  lon = lon || DEFAULT_LON;

  const response = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
    params: {
      lat: lat,
      lon: lon,
      appid: "4ca984292fdd6213f992613245ad59ca"
    }
  });

  return response.data;
};

export default getForecastInfo;
