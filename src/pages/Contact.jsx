import Title from "../components/Title"
import SupportForm from "../components/SupportForm"

function Contact() {
  const contactInfo = [
    {
      title: "Address",
      value: "123 Main Street, City, Country"
    },
    {
      title: "Email",
      value: "support@react-learning.com"
    },
    {
      title: "Phone",
      value: "+1 234 567 890"
    },
    {
      title: "Working Hours",
      value: "Mon - Fri, 9:00 AM - 6:00 PM"
    }
  ]

  return (
    <div className="container py-5">
      <Title title="Contact Us" tagline="We’d love to hear from you. Please get in touch!" />

      <div className="row g-4">
        <div className="col-md-4">
          {contactInfo.map((item, index) => (
            <div className="card mb-3 shadow-sm border-0" key={index}>
              <div className="card-body">
                <h6 className="fw-semibold">{item.title}</h6>
                <p className="text-muted mb-0">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-semibold mb-4">Send Us a Message</h5>
              <SupportForm isSupport={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
