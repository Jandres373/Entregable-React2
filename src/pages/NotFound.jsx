import { Heading, Link } from "@chakra-ui/react";
import React from "react";
import {Link as routerLink, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  return (
    <div>
      <Heading> Error 404 </Heading>{" "}
      <Link as={routerLink} to="/">
        Volver al Home
      </Link>
    </div>
  );
};

export default NotFound;
