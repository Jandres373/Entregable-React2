// componente que controla el inicio y fin de sesion de los usuarios.
// la idea es generar un sistema de login usando Firebase que permita registrar, ingresar y eliminar usuarios.
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { auth, logIn } from "../config/firebase";
import { isSignInWithEmailLink, onAuthStateChanged } from "firebase/auth";
function LogIn() {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState({
    user: "",
    email: "",
    password: "",
  });
  const { user, setUser, userId, setUserId, setAccess } = useAuthContext();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const navigate = useNavigate();

  const onClose = () => {
      /**
       * Cierra el modal y setea las variables de estado.
       * 
       * @returns {void}
       */
      setAccess(false);
      setIsOpen(false);
  };

  const handleOnChange = (e) => {
    let value = { ...inputValue, [e.target.name]: e.target.value };
    setInputValue(value);
  };

  const handleConfirm = async (e) => {
    try {
      setUserId({
        user: inputValue.user,
        email: inputValue.email,
        password: inputValue.password,
      });
      const credetians = await logIn({email:inputValue.email,password:inputValue.password})
      const signedIn = onAuthStateChanged(auth,(user)=>{
        console.log(user)
      })
       if (signedIn) {
          setAccess(false)
          setUser(true)
          navigate("/profile")
          }
    } catch (error) {
      //espacio para crear una funcion que renderice en pantalla texto o active un modal que informe al usuario el resultado de setear las credenciales de acceso.
      console.log(error)
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody pb={6}>
            <FormControl as="form" onSubmit={handleConfirm}>
              <FormLabel>User</FormLabel>
              <Input
                id="user"
                ref={initialRef}
                placeholder="Nombre de usuario"
                autoComplete="username"
                type="name"
                name="user"
                value={inputValue.user}
                onChange={(e) => handleOnChange(e)}
                required
              />
              <FormLabel>Email*</FormLabel>
              <Input
                id="email"
                ref={initialRef}
                placeholder="Nombre de usuario"
                autoComplete="username"
                type="email"
                name="email"
                value={inputValue.email}
                onChange={(e) => handleOnChange(e)}
              />
              <FormLabel>Password*</FormLabel>
              <Input
                id="password"
                ref={initialRef}
                placeholder="contraseña"
                autoComplete="current-password"
                type="password"
                name="password"
                value={inputValue.password}
                onChange={(e) => handleOnChange(e)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default LogIn;
