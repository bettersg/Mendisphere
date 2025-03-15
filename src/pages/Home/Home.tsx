import HeroSection from "./HeroSection";
import SupportSection from "./SupportSection";
import TogetherSection from "./TogetherSection";
import "../style.scss";

const Home: React.FC = () => {
  return (
      <>
        <HeroSection />
        <SupportSection />
        <TogetherSection />
      </>
  );
};

export default Home;
