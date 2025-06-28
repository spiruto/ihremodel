import Image from "next/image";

// app/components/Projects.tsx
const projects = [
  {
    title: "Residential Roof Replacement",
    desc: "Removed aging shingles and installed a new energy-efficient asphalt roof with full weatherproofing.",
    image: "/roofing-1.jpeg",
  },
  {
    title: "Modern Kitchen Transformation",
    desc: "Complete kitchen overhaul featuring custom cabinetry, quartz countertops, and smart appliances.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB84k-qMIWjfpTOhAqC_z74XPiu7Ct3n0U8DmwllJJUI26II--VUhzRpKS4YKS7L5p_A8c8TZjfF5g85aPrTcUMEd2Bjr-p5M7mHvF1DFbGtzcDDZTn7v809Bln-Y9J3Ey7rnMMatujyA2ZsLBdBMrdUfQfsiG8vPw4RUG6vA-p98o5WD0_XLu3ZIs3jE3F6oLHDEwbwmjLNnoiuUCd6C6ye8Nlnm7k_zI9lZenzW0G9ueQfuBVpMv27jUFEFcg4Pnf8WZzprN0sNGV",
  },
  {
    title: "Luxury Bathroom Upgrade",
    desc: "Spa-inspired bathroom with a freestanding tub, walk-in shower, and premium fixtures.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTsdp_H50Du4h9vCEZYGTY5gBfNfiiGqxsTUtDqtFS81-tMgK-CdIlfwlG1heaTMIFtDFBf9j1wT-QYYEi5EFEtWkU7fEVJTmcJJkzxwBLr18Cr1fx-FHpQDK_wTEsbhTKEmlBCE-MEmP09m2eniAUO9gneiB9IL6pdsZ2XUPr7ZmjsSqmQL5KCPn-WkhiDWjMzTAw2Y96dWToc7crSxA680DGcco0wVHhrJRlDj_wS9sNYw65lPywazg6rb9EJRg-D7MxNgz39f3b",
  },
  {
    title: "Spacious Home Addition",
    desc: "Added a new family room and master suite, seamlessly integrated with the existing structure.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBf2uyeTQYSFPvDPfNVFUo1rufa9AZpWNPJ-6XqLBELtyZRI91wglhpIQgFGc3KM44XDzO325bY1I8w93VKP0Tw631tlAw-k7GdfkauRruXThiZZU-iXEE5InEFTvWuqh_ouYO1gSe1-pryJhuBBTmVhUkN-zJtJ6njnHGwIaYLMQVx8tT2pXboxy6fV7m0NhXF28WWfzUrLOlyHO_AokT2o0aQLzx5-ogHNOTpn6MR0CrWIDjNCg1YtHSLwdxNgcQycclpMBoGsfBP",
  },

  {
    title: "Roof Leak Repair & Waterproofing",
    desc: "Identified and sealed multiple roof leaks, applied full waterproof membrane to extend roof life and prevent future damage.",
    image: "/roofing-2.jpeg",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-100 shadow-md">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-10">
          Our Recent Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition border border-gray-200"
            >
              <Image
                src={p.image}
                alt={p.title}
                width={100}
                height={100}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  {p.title}
                </h3>
                <p className="text-gray-600 mb-4">{p.desc}</p>
                {/* <a
                  href="#"
                  className="text-amber-500 hover:text-amber-600 font-medium"
                >
                  View Details{" "}
                  <span className="material-icons align-middle text-sm">
                    arrow_forward
                  </span>
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
