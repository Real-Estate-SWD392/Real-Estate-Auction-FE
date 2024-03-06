import axios from "axios";

const getAllBill = async (id,headers) => {
  return axios.get(`http://localhost:8080/bill/member/${id}`, {
    headers,
    withCredentials: true,
  });
};

export { getAllBill };
