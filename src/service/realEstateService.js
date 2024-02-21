import axios from "axios";

const getRealEstateByOwnerId = async (id, headers) => {
    return await axios.get(`http://localhost:8080/real-estate/owner/${id}`, {headers});
}


export {getRealEstateByOwnerId};