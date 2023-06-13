import axios from "axios";
const API_KEY = "4ca984292fdd6213f992613245ad59ca";

//ponemos la url de la api con su api key
const getApiInfo = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city || 'Junin'}&appid=${API_KEY}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    alert("No se encontró la ciudad que buscas");
  }
};


export default getApiInfo;

