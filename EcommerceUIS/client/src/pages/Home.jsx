import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import "../styles/home.css";

export default function Home() {
  // Si quieres navegar programáticamente desde Categorías, pásale onGo con tu router.
  return (
    <main className="home">
      {/* Solo BODY: el Header y el Footer ya existen en tu Layout */}
      <Carousel />
      <Categories />
      <FeaturedProducts />
    </main>
  );
}
