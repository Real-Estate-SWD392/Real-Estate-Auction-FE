import axios from "axios";

const listAuctions = async () => {
    return await axios.get(`http://localhost:8080/auction`);
}

const getAuctionById = async (id, headers) => {
    return await axios.get(`http://localhost:8080/auction/ID/${id}`, {headers});
}

const createAuction = async (headers) => {
    return await axios.post(`http://localhost:8080/auction`, {headers});
}

export {listAuctions, getAuctionById, createAuction};