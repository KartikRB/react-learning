import Title from "../components/Title"

function About() {
  const aboutData = [
    {
      title: "Our Mission",
      description:
        "Our mission is to build simple, reliable, and user-friendly web applications that solve real-world problems."
    },
    {
      title: "Our Vision",
      description:
        "We aim to become a trusted name in digital solutions by delivering high-quality and innovative products."
    },
    {
      title: "What We Do",
      description:
        "We design and develop modern, responsive web applications using the latest technologies."
    },
    {
      title: "Our Values",
      description:
        "Integrity, creativity, and continuous learning are at the core of everything we do."
    },
    {
      title: "Why Choose Us",
      description:
        "We focus on performance, clean design, and a smooth user experience in every project."
    },
    {
      title: "Our Team",
      description:
        "Our team consists of passionate developers and designers who love building great products."
    },
    {
      title: "Our Approach",
      description:
        "We follow best practices, write clean code, and keep the user at the center of our process."
    },
    {
      title: "Customer Focus",
      description:
        "We listen carefully to user needs and continuously improve our solutions based on feedback."
    }
  ]

  return (
    <div className="container py-5">
      <Title title="About Us" tagline="Get to know more about our values, vision, and work" />
      <div className="row g-4">
        {aboutData.map((item, index) => (
          <div className="col-sm-6 col-lg-3" key={index}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <h5 className="card-title fw-semibold">
                  {item.title}
                </h5>
                <p className="card-text text-muted mt-3">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
