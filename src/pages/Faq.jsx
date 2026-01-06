import Title from "../components/Title"
import { Link } from 'react-router-dom';

function Faq() {
  const faqs = [
    {
      question: "How do I contact support?",
      answer:
        "You can contact our support team through the Support page by submitting a support request form. We usually respond within 24–48 hours."
    },
    {
      question: "Is this platform free to use?",
      answer:
        "Yes, the platform is free for learning purposes. Some advanced features may be added later."
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click on the 'Forgot Password' link on the login page and follow the instructions sent to your email."
    },
    {
      question: "Which devices are supported?",
      answer:
        "Our platform works on desktops, tablets, and mobile devices with modern web browsers."
    },
    {
      question: "Can I report a bug?",
      answer:
        "Yes, please report bugs through the Support page with clear details so we can fix them quickly."
    }
  ]

  return (
    <div className="container py-5">
      <Title
        title="Frequently Asked Questions"
        tagline="Find answers to common questions below"
      />

      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, index) => (
              <div className="accordion-item mb-3 border-0 shadow-sm" key={index}>
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
