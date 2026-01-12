import Title from "../components/Title"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import api from "../api/Axios";

function Faq() {
  const [faqs, setFaqs] = useState([]);

  const fetchFaqs = async () => {
    try {
      const response = await api.get("/get-faqs");
      if (response.data.status) {
        setFaqs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching faqs:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);
  
  return (
    <div className="container py-5">
      <Title
        title="Frequently Asked Questions"
        tagline="Find answers to common questions below"
      />

      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="accordion" id="faqAccordion">
            {faqs
              .filter(faq => faq.is_active)
              .map((faq, index) => (
                <div
                  className="accordion-item mb-3 border-0 shadow-sm"
                  key={index}
                >
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${index}`}
                    >
                      {faq.question}
                    </button>
                  </h2>

                  <div
                    id={`faq-${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="text-center mt-5">
            <p className="text-muted mb-0">
              Still need help?
            </p>
            <Link to="/support" className="text-color-primary">
              Visit Support Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq
