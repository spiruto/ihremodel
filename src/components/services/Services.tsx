// app/components/Services.tsx
const services = [
  {
    icon: "kitchen",
    title: "Kitchen Remodeling",
    desc: "From modern makeovers to classic designs, we create kitchens that are both beautiful and functional.",
  },
  {
    icon: "bathtub",
    title: "Bathroom Renovations",
    desc: "Transform your bathroom into a spa-like retreat with our expert renovation services.",
  },
  {
    icon: "home_work",
    title: "Home Additions",
    desc: "Expand your living space with seamless home additions tailored to your family's needs.",
  },
  {
    icon: "construction",
    title: "General Contracting",
    desc: "Comprehensive project management for all types of home improvement projects.",
  },
  {
    icon: "carpenter",
    title: "Custom Carpentry",
    desc: "Bespoke woodworking solutions, from custom cabinets to intricate trim work.",
  },
  {
    icon: "format_paint",
    title: "Interior & Exterior Painting",
    desc: "Professional painting services to refresh and protect your home, inside and out.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-10">
          Our Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-gray-50 p-8 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">
                <span className="material-icons text-amber-500 text-5xl">
                  {service.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-700">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
