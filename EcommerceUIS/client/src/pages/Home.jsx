import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import "../styles/home.css";

export default function Home() {
  return (
    <main className="home">
      {/* Solo BODY: tu Header/Footer ya existen en el Layout */}
      <Carousel />
      <Categories />
      <FeaturedProducts />
    </main>
  );
}
