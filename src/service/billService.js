import axios from "axios";

const getAllBill = async (id, headers) => {
  return axios.get(`http://localhost:8080/bill/member/${id}`, {
    headers,
    withCredentials: true,
  });
};

const createBill = async (id, data, headers) => {
  return axios.post(`http://localhost:8080/bill/createBill/${id}`, data, {
    headers,
    withCredentials: true,
  });
};

export { getAllBill, createBill };
