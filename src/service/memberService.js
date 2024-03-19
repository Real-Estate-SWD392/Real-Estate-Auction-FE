import axios from "axios";

const getMemberInfoById = async (id, headers) => {
  return axios.get(`http://localhost:8080/member/${id}`, {
    headers,
  });
};

const getBidListByMemberId = async (id, headers) => {
  return await axios.get(`http://localhost:8080/member/bid-list/${id}`, {
    headers,
  });
};

const addAuctionToFavList = async (id, requestData, headers) => {
  return axios.put(
    `http://localhost:8080/member/add-favorite-auction/${id}`,
    requestData,
    { headers, withCredentials: true }
  );
};

const ratingOwnerAuction = async (id, requestData, headers) => {
  return axios.post(
    `http://localhost:8080/member/rating-owner-auction/${id}`,
    requestData,
    { headers, withCredentials: true }
  );
};

export { getMemberInfoById, addAuctionToFavList, ratingOwnerAuction };
