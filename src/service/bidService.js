import axios from "axios";

const createBid = async (requestData, headers) => {
  return await axios.post(
    `http://localhost:8080/bid`,
    requestData,
    { headers },
    { withCredentials: true }
  );
};

export { createBid };
