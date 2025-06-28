// app/components/WhyChooseUs.tsx
"use client";

export default function WhyChooseUs() {
  const features = [
    {
      icon: "engineering",
      title: "Built with Expertise",
      desc: "Our team combines years of experience with modern techniques to deliver projects that stand the test of time.",
    },
    {
      icon: "handshake",
      title: "Client-Centered Approach",
      desc: "We listen, plan, and execute based on your unique goals — keeping you informed and involved at every stage.",
    },
    {
      icon: "build_circle",
      title: "Precision in Every Step",
      desc: "From the foundation to the final finish, we apply meticulous care to ensure outstanding quality and durability.",
    },
    {
      icon: "timer",
      title: "On-Time Delivery",
      desc: "We respect your time — our structured process ensures your project is completed on schedule without cutting corners.",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Why Homeowners Trust Us
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          We bring craftsmanship, reliability, and a personal touch to every
          renovation project — turning your ideas into inspired living spaces.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="bg-amber-400 rounded-full p-3 my-auto">
              <span className="text-white material-icons align-middle text-xl">
                {f.icon}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
              <p className="text-gray-700">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
