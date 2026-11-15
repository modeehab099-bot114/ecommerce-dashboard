
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="bg-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-indigo-600 font-semibold text-sm mb-3">
            WELCOME TO ANAZONE
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Discover Products You'll Love
          </h1>

          <p className="text-gray-500 text-lg mt-5 leading-relaxed">
            Explore our collection of quality products and find everything
            you need in one place.
          </p>

          <Link
            to="/products"
            className="inline-block mt-8 bg-indigo-600 text-white px-7 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
