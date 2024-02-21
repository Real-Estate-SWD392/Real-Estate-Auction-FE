import axios from "axios";



const getMemberInfoById = async (id) => {
    return await axios.get(`http://localhost:8080/member/${id}`);
}

const getBidListByMemberId = async (id, headers) => {
    return await axios.get(`http://localhost:8080/member/bid-list/${id}`, {headers});
}


const addAuctionToFavList = async (id, requestData, headers) => {
    return await axios.put(`http://localhost:8080/member/add-favorite-auction/${id}`, requestData, {headers}, {withCredentials: true});
}



export {getMemberInfoById, addAuctionToFavList};