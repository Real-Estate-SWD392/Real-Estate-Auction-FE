import Banner from "./banner/Banner";
import Discover from "./discover/Discover";
import Offer from "./offer/Offer";
import RelatedPropList from "./related-prop/RelatedPropList";
import Type from "./type/Type";

const Home = () => {
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
