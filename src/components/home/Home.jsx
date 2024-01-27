import Banner from "./banner/Banner";
import Offer from "./offer/Offer";
import RelatedPropList from "./related-prop/RelatedPropList";

const Home = () => {
  return (
    <div className="home-container">
      <Banner />
      <Offer />
      <RelatedPropList />
    </div>
  );
};

export default Home;
