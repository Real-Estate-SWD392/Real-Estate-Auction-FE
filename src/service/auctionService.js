import axios from "axios";

const listAuctions = async () => {
    return await axios.get(`http://localhost:8080/auction/`);
}

const listAuctionsByStatus = async (status) => {
    return await axios.get(`http://localhost:8080/auction//status/${status}`);
}

const getAuctionById = async (id, headers) => {
    return await axios.get(`http://localhost:8080/auction/ID/${id}`, {headers});
}

const createAuction = async (headers) => {
    return await axios.post(`http://localhost:8080/auction`, {headers});
}

const handleAuctionRequestByAdmin = async (id,data, headers) => {
    return await axios.put(`http://localhost:8080/auction/handleAuctionRequest/${id}`, data, {headers, withCredentials: true});
}

export {listAuctions, getAuctionById, createAuction, handleAuctionRequestByAdmin};