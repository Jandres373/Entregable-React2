import { Box } from "@chakra-ui/react";
import { Navigate, useLoaderData } from "react-router-dom";
import Profile from "../pages/Profile";
import { useAuthContext } from "../context/UserContext";

const PrivateLayout = () => {
  const { user } = useAuthContext();

  return <>{user ? <Profile /> : <Navigate to={"/"} />}</>;
};

export default PrivateLayout;
