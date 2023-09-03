import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userId, setUserId] = useState({
    email: "",
    password: "",
  });
  const [access, setAccess] = useState(false);
  const [location, setLocation] = useState({ lat: 13.53 , lon: 2.04 });
  const [weather, setWeather] = useState();
  const [isShowingData, setIsShowingData] = useState(true);
  const [weatherDataLoaded, setWeatherDataLoaded] = useState(false);
  const [countryData, setCountryData] = useState();
  const [contrast,setContrast] = useState(false)
  const [isPlaceAvail, setIsPlaceAvail] = useState(true)
  const [isLocationAvail,setIsLocationAvail] = useState(true)

  const usersLocation = () => {
    setIsShowingData(false);
    const options = {
      enableHighAccuracy: true,
    };
    async function success(pos) {
      const coords = pos.coords;
      const coordsData = {
        lat: coords.latitude,
        lon: coords.longitude,
      };
      setLocation(coordsData);
      setTimeout(() => {
        setIsShowingData(true);
      }, 500);
      
    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      console.log('no has dado permiso')
      setIsLocationAvail(false)
       setTimeout(() => {
        setIsLocationAvail(true)
      }, 5000) ;
      return error
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const searchByLocation = async (e,place) => { 
    e.preventDefault()
    const apiKey = import.meta.env.VITE_WEATHERAPP_APP_ID;
    const city = place;
    try {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const newLocation = {
        lat: data.data.coord.lat,
        lon: data.data.coord.lon,
      };
      setLocation(newLocation);
      setIsPlaceAvail(true)
    } catch (error) {
      console.error("Hubo un error al obtener los datos del clima:", error);
      setIsPlaceAvail(false)
      throw error;
    }
  }

  useEffect(() => {
    const weatherData = async (latitude, longitude, measure) => {
      const apiKey = import.meta.env.VITE_WEATHERAPP_APP_ID;
      const lat = latitude;
      const lon = longitude;
      const units = measure
      try {
        const data = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
        );
        setWeather(data.data);
        setWeatherDataLoaded(true);
      } catch (error) {
        console.error("Hubo un error al obtener los datos del clima:", error);
        throw error;
      }
    };
    weatherData(location.lat, location.lon, 'metric');
  }, [location]);

  useEffect(() => {
    if (weatherDataLoaded) {
      const getCountryData = async (countryCode) => { 
        const data = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
          .then(e => setCountryData(e.data[0]))
          
      } 
      getCountryData(weather.sys.country);
    }
  }, [weather, weatherDataLoaded]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userId,
        setUserId,
        access,
        setAccess,
        location,
        setLocation,
        searchByLocation,
        usersLocation,
        weather,
        setWeather,
        isShowingData,
       countryData,
       contrast,
       setContrast,
       isPlaceAvail,
       isLocationAvail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;

export const useAuthContext = () => useContext(AuthContext);
