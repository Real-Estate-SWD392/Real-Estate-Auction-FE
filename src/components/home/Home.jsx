import { useContext, useEffect } from "react";
import Banner from "./banner/Banner";
import Discover from "./discover/Discover";
import Offer from "./offer/Offer";
import RelatedPropList from "./related-prop/RelatedPropList";
import Type from "./type/Type";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useContext(AuthContext);

  // const notStartList = useSelector((state) => state.auction.notStartAuction);

  // console.log(notStartList);

  const nav = useNavigate();

  // useEffect(() => {
  //   if (user?.role === "staff") {
  //     nav("/accommondation-staff");
  //   } else if (user?.role === "admin") {
  //     nav("/accommondation-admin");
  //   }
  // }, [user]);

  useEffect(() => {
    if (user?.status === "Banned") {
      console.log("Banned");
    }
  }, [user]);

  return (
    <div className="home-container">
      <Banner />
      <Offer />
      <RelatedPropList />
      <Type />
      <Discover />
    </div>
  );
};

export default Home;
