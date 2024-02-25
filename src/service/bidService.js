import axios from "axios";

const createBid = async (requestData, headers) => {
  console.log("request Data: ", requestData);
  return axios.post(`http://localhost:8080/bid`, requestData, {
    headers,
    withCredentials: true,
  });
};

export { createBid };
