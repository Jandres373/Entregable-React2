import { HamburgerIcon } from "@chakra-ui/icons";
import {  Button, Center, Icon, Popover, PopoverBody,PopoverContent, PopoverTrigger, Portal, Text } from "@chakra-ui/react";
import React from "react";
import { GoPerson } from "react-icons/go";
import { useAuthContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function PopOver() {
  const initRef = React.useRef();
  const {
    user,
    setAccess,
    setUser,
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

  return (
    <Popover closeOnBlur={false} placement="bottom" initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button ml='10px' colorScheme='blue' ><Icon as={HamburgerIcon} /></Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent w='100px'>
              <PopoverBody>
              {user ? (
                  <Center colorScheme="red" onClick={handleLogOut} cursor='pointer' borderBottom='2px solid blue' display='flex' gap='10px'>
                     <Icon as={GoPerson} />
                     <Text> log out</Text>
                  </Center>
                ) : (
                  <Center colorScheme="blue" onClick={handleLogIn} cursor='pointer' borderBottom='2px solid blue' display='flex' gap='10px'>
                    <Icon as={GoPerson} />
                    <Text>log in</Text>
                  </Center>
                )}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
export default PopOver;
