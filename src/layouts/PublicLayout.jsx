import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuthContext } from "../context/UserContext";
import { objImages } from "../config/images";
import { AnimatePresence, motion } from "framer-motion";

const PublicLayout = () => {
  const { weather,contrast,setContrast } = useAuthContext();
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(null);
  const [animateBackground, setAnimateBackground] = useState(false);

  // Detecta cambios en weather.weather[0].main y actualiza currentBackgroundImage
  useEffect(() => {
    if (weather) {
      const mainWeather = weather.weather[0].main;
      switch (mainWeather) {
        case 'Clouds':
          setCurrentBackgroundImage(objImages.bgImageCloudy);
          setContrast(false)
          break;
        case 'Rain':
          setCurrentBackgroundImage(objImages.bgImageRain);
          setContrast(false)
          break;
        case 'Clear':
          setCurrentBackgroundImage(objImages.bgImageSunny);
          setContrast(false)
          break;
        case 'Thunderstorm':
          setCurrentBackgroundImage(objImages.bgImageStorm);
          setContrast(false)
          break;
          case 'Sand':
          case 'Dust':
          setCurrentBackgroundImage(objImages.bgImageSand);
          setContrast(false)
          break;
        case 'Mist':
        case 'Haze':
          setCurrentBackgroundImage(objImages.bgImageMist);
          setContrast(true)
          break;
        default:
          setCurrentBackgroundImage(null); 
          break;
      }
    }
  }, [weather]);

  // Cuando currentBackgroundImage cambie, activa la animación
  useEffect(() => {
    if (currentBackgroundImage) {
      setAnimateBackground(true);
    }
  }, [currentBackgroundImage]);

  return (
    <>
      <AnimatePresence>
        <Box
          as={motion.div}
          exit={{ x: -100 }} 
          bgImage={currentBackgroundImage}
          bgSize="cover"
          bgPos="bottom"
          animate={animateBackground ? { opacity: 1 } : { opacity: 0 }} 
          transition='2s'
        >
          <NavBar />
          <Outlet />
          <footer
            style={{ height: "20px", backdropFilter: "blur(50px)" }}  
          ></footer>
        </Box>
      </AnimatePresence>
    </>
  );
};

export default PublicLayout;
