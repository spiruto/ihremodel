// app/components/Hero.tsx
import HeroImage from "@/assets/images/hero-img.jpg";
export default function Hero() {
  return (
    <section
      id="home"
      style={{ backgroundImage: `url(${HeroImage.src})` }}
      className="relative text-white py-32 md:py-48 bg-cover bg-center "
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Transforming Houses into Dream Homes
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
          Expert craftsmanship, innovative designs, and reliable service for all
          your remodeling needs.
        </p>
        <a
          href="#contact"
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition text-lg"
        >
          Get a Free Quote
        </a>
      </div>
    </section>
  );
}
