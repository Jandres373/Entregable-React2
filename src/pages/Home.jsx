import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  InputGroup,
  Image,
  InputLeftElement,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Icon,
  InputRightElement,
  HStack,
  useMediaQuery,
  FormControl,
  FormHelperText,
  Circle,
} from "@chakra-ui/react";
import Scene from "../components/Scene";
import { useAuthContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import { GoCloud, GoLocation, GoMoveToBottom } from "react-icons/go";
import { objImages } from "../config/images";
import { LiaWindSolid, LiaWindowCloseSolid } from "react-icons/lia";
import countries from "../config/countries.json";

const Home = () => {
  const [isLargeScreen] = useMediaQuery("(min-width: 904px)");
  const { searchByLocation, weather, countryData, contrast, isPlaceAvail } =
    useAuthContext();
  const [place, setPlace] = useState("");
  const [units, setUnits] = useState("c");
  const [temp, setTemp] = useState(null);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setPlace(value);
  };

  useEffect(() => {
    if (weather) {
      setTemp(weather.main.temp);
    }
  }, [weather]);

  const changeUnits = () => {
    units === "c" && setTemp((temp * 1.8).toFixed(2));
    units === "c" && setUnits("f");
    units === "f" && setTemp((temp / 1.8).toFixed(2));
    units === "f" && setUnits("c");
  };

  return (
    <>
      {weather && (
        <>
          {isLargeScreen ? (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              w="100vw"
              h="90vh"
              paddingX="50px"
              backdropFilter="blur(0px)"
            >
              <Box
                w="20%"
                color={contrast ? "black" : "white"}
                px="25px"
                py="100px"
              >
                <Tabs variant="unstyled" backdropBlur={"25px"}>
                  <TabList>
                    <Tab>Place</Tab>
                    <Tab>Info</Tab>
                    <Tab>Forecast</Tab>
                  </TabList>
                  <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="blue.500"
                    borderRadius="1px"
                  />

                  <TabPanels>
                    <TabPanel w="400px">
                      <Heading>{weather.name}</Heading>
                      <HStack>
                        <Heading>{countryData?.name.common}</Heading>
                        <Image w="30px" src={countryData?.flags.png} />
                      </HStack>
                      <Heading mt="20px" fontSize="45px"></Heading>
                    </TabPanel>
                    <TabPanel>
                      {countryData && (
                        <>
                          {" "}
                          <Heading fontSize="20px">Country info</Heading>
                          <br />
                          <Text>Nam: {countryData.name.common} </Text>
                          <Text>Pop: {countryData.population} </Text>
                          <Text>cap: {countryData.capital} </Text>
                          <Text>
                            lan: {Object.keys(countryData.languages)}{" "}
                          </Text>
                          <Text>
                            cur: {Object.keys(countryData.currencies)}
                          </Text>
                        </>
                      )}
                    </TabPanel>
                    <TabPanel>Under construction</TabPanel>
                  </TabPanels>
                </Tabs>

                <Box className="inputContainer" display="flex" w="400px">
                  <FormControl>
                    <form
                      name="citySearch"
                      onSubmit={(e) => searchByLocation(e, place)}
                      style={{ width: "90%", display: "flex" }}
                    >
                      <InputGroup w="80%">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<GoLocation color="gray.300" />}
                        />
                        <InputRightElement
                          mr="25px"
                          cursor="pointer"
                          fontSize="25px"
                          onClick={() => setPlace("")}
                          children={<LiaWindowCloseSolid color="white" />}
                        />
                        <Input
                          w="95%"
                          type="text"
                          placeholder="Buscar por ubicación"
                          _placeholder={
                            contrast ? { color: "black" } : { color: "white" }
                          }
                          value={place}
                          onChange={handleOnChange}
                          list="countries"
                        />
                        {!isPlaceAvail && (
                          <HStack
                            position="absolute"
                            bottom="-25px"
                            fontSize="15px"
                            fontWeight="bold"
                          >
                            {" "}
                            <Circle w="5px" h="5px" bgColor="red" />
                            <FormHelperText color="red" lineHeight="1">
                              {" "}
                              Unable to find this location.
                            </FormHelperText>
                          </HStack>
                        )}
                        <datalist id="countries">
                          {countries.countries.map((e, i) => (
                            <option key={i} value={e.capital_en} />
                          ))}
                        </datalist>
                      </InputGroup>
                      <Button
                        ml="5px"
                        w="20%"
                        onClick={(e) => searchByLocation(e, place)}
                      >
                        Search
                      </Button>
                    </form>
                  </FormControl>
                </Box>
              </Box>

              <Box
                w="40%"
                p="30px"
                mt="50px"
                mb="50px"
                bgColor="#ffffff90"
                borderRadius="18px"
                display="flex"
                flexDirection="column"
                gap="5px"
              >
                <Center>
                  <Heading>Weather app</Heading>
                </Center>
                <Center>{weather.name}</Center>
                <Center>
                  <Icon as={GoLocation} fontSize="20px" />
                </Center>
                <Center>
                  {" "}
                  <Scene size={"200px"} />
                </Center>
                <Box display="flex" justifyContent="center" gap="130px">
                  <Box className="weather img">
                    {" "}
                    <Image
                      w="120px"
                      h="120px"
                      src={
                        weather &&
                          ((weather.weather[0].main === "Thunderstorm" &&
                            objImages.stromImg) ||
                            (weather.weather[0].main === "Rain" &&
                              objImages.rainImg) ||
                            (weather.weather[0].main === "Clear" &&
                              objImages.sunImg) ||
                            (weather.weather[0].main === "Clouds" &&
                              objImages.cloudImg) ||
                            (weather.weather[0].main === "Sand" &&
                              objImages.sandImg) ||
                            (weather.weather[0].main === "Dust" &&
                              objImages.sandImg) ||
                            weather.weather[0].main === "Mist" ||
                            ("Haze" && objImages.mistImg))
                      }
                    />{" "}
                  </Box>
                  <Box className="weather data">
                    <Text fontSize="20px" fontWeight="800">
                      {" "}
                      "{weather.weather[0].main}"{" "}
                    </Text>
                    <Text> {weather.weather[0].description} </Text>
                    <Text>
                      {" "}
                      <abbr title="Wind speed">
                        {" "}
                        <Icon as={LiaWindSolid} /> {weather.wind.speed} M/s{" "}
                      </abbr>{" "}
                    </Text>
                    <Text>
                      {" "}
                      <abbr title="Clouds percentage">
                        <Icon as={GoCloud} /> {weather.clouds.all} %{" "}
                      </abbr>
                    </Text>
                    <Text>
                      {" "}
                      <Icon as={GoMoveToBottom} /> {weather.main.pressure}{" "}
                    </Text>
                  </Box>
                </Box>
                <Center>
                  {" "}
                  <Heading fontSize="30px">
                    {" "}
                    {!temp ? weather.main.temp : temp}{" "}
                    {(units === "c" && "°C") || (units === "f" && "°F")}{" "}
                  </Heading>{" "}
                </Center>
                <Center>
                  <Button
                    colorScheme="gray"
                    mt="10px"
                    boxShadow="1px 1px 10px"
                    onClick={changeUnits}
                  >
                    Change
                  </Button>
                </Center>
              </Box>
            </Box>
          ) : (
            //** */ se hace el despliegue del interfaz menor a 904 px
            //~~ */ se hace el despliegue del interfaz menor a 904 px
            <Center>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                w="100vw"
                h="100vh"
                paddingX="50px"
                backdropFilter="blur(0px)"
              >
                <Box
                  className="inputContainer"
                  mt="50px"
                  display="flex"
                  w="100%"
                >
                  <FormControl>
                    <form
                      name="citySearch"
                      onSubmit={(e) => searchByLocation(e, place)}
                      style={{ width: "100%", display: "flex" }}
                    >
                      <InputGroup w="80%">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<GoLocation color="gray.300" />}
                        />
                        <InputRightElement
                          mr="25px"
                          cursor="pointer"
                          fontSize="25px"
                          onClick={() => setPlace("")}
                          children={<LiaWindowCloseSolid color="white" />}
                        />
                        <Input
                          w="95%"
                          type="text"
                          placeholder="Buscar por ubicación"
                          _placeholder={
                            contrast ? { color: "black" } : { color: "white" }
                          }
                          color={contrast ? "black" : "white"}
                          value={place}
                          onChange={handleOnChange}
                          list="countries"
                        />
                        {!isPlaceAvail && (
                          <HStack
                            position="absolute"
                            top="-30px"
                            fontSize="15px"
                            fontWeight="bold"
                          >
                            {" "}
                            <Circle w="5px" h="5px" bgColor="red" />
                            <FormHelperText color="red" lineHeight="1">
                              {" "}
                              Unable to find this location.
                            </FormHelperText>
                          </HStack>
                        )}
                        <datalist id="countries">
                          {countries.countries.map((e, i) => (
                            <option key={i} value={e.capital_en} />
                          ))}
                        </datalist>
                      </InputGroup>
                      <Button
                        ml="5px"
                        w="20%"
                        onClick={(e) => searchByLocation(e, place)}
                      >
                        Search
                      </Button>
                    </form>
                  </FormControl>
                </Box>

                <Box
                  w="100%"
                  h="80vh"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems={"center"}
                  gap={"5px"}
                  mt="20px"
                  mb="50px"
                  bgColor="#ffffff90"
                  borderRadius="18px"
                >
                  <Center>
                    <Heading>Weather app</Heading>
                  </Center>
                  <Center>
                    {weather.name} / {countryData?.name.common}
                  </Center>
                  <Center>
                    <Icon as={GoLocation} fontSize="20px" />
                  </Center>
                  <Center>
                    {" "}
                    <Scene size={"200px"} />
                  </Center>
                  <Box display="flex" justifyContent="center" gap="100px">
                    <Box className="weather img">
                      {" "}
                      <Image
                        w="120px"
                        h="120px"
                        src={
                          weather &&
                          ((weather.weather[0].main === "Thunderstorm" &&
                            objImages.stromImg) ||
                            (weather.weather[0].main === "Rain" &&
                              objImages.rainImg) ||
                            (weather.weather[0].main === "Clear" &&
                              objImages.sunImg) ||
                            (weather.weather[0].main === "Clouds" &&
                              objImages.cloudImg) ||
                            (weather.weather[0].main === "Sand" &&
                              objImages.sandImg) ||
                            (weather.weather[0].main === "Dust" &&
                              objImages.sandImg) ||
                            weather.weather[0].main === "Mist" ||
                            ("Haze" && objImages.mistImg))
                        }
                      />{" "}
                    </Box>
                    <Box className="weather data">
                      <Text fontSize="20px" fontWeight="800">
                        {" "}
                        "{weather.weather[0].main}"{" "}
                      </Text>
                      <Text> {weather.weather[0].description} </Text>
                      <Text>
                        {" "}
                        <abbr title="Wind speed">
                          {" "}
                          <Icon as={LiaWindSolid} /> {weather.wind.speed} M/s{" "}
                        </abbr>{" "}
                      </Text>
                      <Text>
                        {" "}
                        <abbr title="Clouds percentage">
                          <Icon as={GoCloud} /> {weather.clouds.all} %{" "}
                        </abbr>
                      </Text>
                      <Text>
                        {" "}
                        <Icon as={GoMoveToBottom} /> {weather.main.pressure}{" "}
                      </Text>
                    </Box>
                  </Box>
                  <Center>
                    {" "}
                    <Heading fontSize="30px">
                      {" "}
                      {!temp ? weather.main.temp : temp}{" "}
                      {(units === "c" && "°C") || (units === "f" && "°F")}{" "}
                    </Heading>{" "}
                  </Center>
                  <Center>
                    <Button
                      colorScheme="gray"
                      mt="10px"
                      boxShadow="1px 1px 10px"
                      onClick={changeUnits}
                    >
                      Change
                    </Button>
                  </Center>
                </Box>
              </Box>
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default Home;
