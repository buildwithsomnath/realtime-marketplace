import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";

const Home = () => {
    return (
        <div className="space-y-24">

            <Hero />

            <Categories />

            <FeaturedProducts />

        </div>
    );
};

export default Home;