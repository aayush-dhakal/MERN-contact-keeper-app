// this file will check if the token is passes in. If it is then we will set it to default header if not then we will delete it from the default header

import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // axios.defaults is used to set kinda like global header
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
