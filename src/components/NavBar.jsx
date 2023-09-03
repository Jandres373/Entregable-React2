import {
  Box,
  Button,
  HStack,
  Icon,
  Spinner,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoLocation, GoPerson } from "react-icons/go";
import { useAuthContext } from "../context/UserContext";
import LogIn from "./LogIn";
import { HamburgerIcon } from "@chakra-ui/icons";
import PopOver from "./PopOver";

const NavBar = ({ data }) => {
  const toast = useToast();
  const [isLargeScreen] = useMediaQuery("(min-width: 904px)");
  const {
    user,
    setUser,
    userId,
    access,
    setAccess,
    usersLocation,
    weather,
    isShowingData,
  } = useAuthContext();
  const navigate = useNavigate();

  const handleLogIn = () => {
    setAccess(true);
  };

  const handleLogOut = () => {
    setUser(false);
    setAccess(false);
    navigate("/");
  };

  const getUsersLocation = async () => {
    usersLocation();
  };

  useEffect(() => {
    setTimeout(() => {
      toast({
        title:
          "Permit GPS to show your current location or search manually for any place",
        description:
          "This website will request your location to show your data based on GPS",
        status: "loading",
        duration: 9000,
        isClosable: true,
      });
    }, 1500);
  }, []);

  return (
    <>
      {access && <LogIn />}
      <Box
        className="largeScreen"
        as={"nav"}
        display="flex"
        justifyContent="space-between"
      >
        {" "}
        {isLargeScreen ? (
          <>
            <Box
              bgColor="transparent"
              w="100vw"
              h="50px"
              borderBottomRadius="18px"
              paddingX="50px"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              color="white"
              backdropFilter="blur(5px)"
            >
              <Box
                className="Logo"
                color="white"
                fontSize="25px"
                fontWeight="bold"
              >
                Weather J.M
              </Box>
              <Box as={NavLink} to="/">
                Weather
              </Box>
              <HStack spacing="15px">
                <Box display="flex" alignItems="center" gap="25px">
                  <HStack>
                    <Icon as={GoLocation} fontSize="20px" />
                    <Text>{weather?.name}</Text>
                  </HStack>
                  <Button onClick={getUsersLocation}>
                    {isShowingData ? (
                      "GPS Location"
                    ) : (
                      <>
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="md"
                        />
                        <Text>Loading</Text>
                      </>
                    )}
                  </Button>
                </Box>
                <Box as={NavLink} to="/profile">
                  {user ? (
                    <Box display="flex" alignItems="center">
                      <Icon as={GoPerson} fontSize="20px" />
                      <Text>: {userId && userId.user} </Text>
                    </Box>
                  ) : null}
                </Box>
                {user ? (
                  <Button colorScheme="red" onClick={handleLogOut}>
                    <Text>log out</Text>
                  </Button>
                ) : (
                  <Button colorScheme="blue" onClick={handleLogIn}>
                    <Text>log in</Text>
                  </Button>
                )}
              </HStack>
            </Box>
          </>
        ) : (
          // se hace el despliegue del interfaz menor a 904 px
          <Box
            bgColor="transparent"
            w="100vw"
            h="50px"
            borderBottomRadius="18px"
            paddingX="50px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            color="white"
            backdropFilter="blur(5px)"
          >
            <Box
              className="Logo"
              color="white"
              fontSize="25px"
              fontWeight="bold"
            >
              <Box as={NavLink} to="/">
                W J.M
              </Box>
            </Box>
            <Box>
              <Button onClick={getUsersLocation}>
                {isShowingData ? (
                  "GPS Location"
                ) : (
                  <>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="md"
                    />
                    <Text>Loading</Text>
                  </>
                )}
              </Button>
              <PopOver />
              
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default NavBar;
