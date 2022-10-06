import React from "react";
import useAuthentication from "../hooks/useAuthentication";

const BoardWritePage = () => {
  useAuthentication(true);
  return <div>Board Write PAge!!</div>;
};

export default BoardWritePage;
