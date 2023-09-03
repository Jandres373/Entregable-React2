import axios from "axios";

export const weatherData = async (latitude, longitude) => {
  const apiKey = import.meta.env.VITE_WEATHERAPP_APP_ID;
  const lat = latitude;
  const lon = -longitude;
  try {
    const resp = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    return resp;
  } catch (error) {
    console.error("Hubo un error al obtener los datos del clima:", error);
    throw error;
  }
};

