import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/Authentication_context/AuthContext";

const Photos = () => {
  const { token } = useContext(AuthContext);
  const photosData = async () => {
    const response = await fetch(
      "https://api.unsplash.com/photos?page=1/?client_id=-o5dYWXmaxCHXd3s_J-gcQTxXn3B7H4F9P2wWParcpI"
    );
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    photosData();
    // eslint-disable-next-line
  }, [token]);
  return <div></div>;
};

export default Photos;
