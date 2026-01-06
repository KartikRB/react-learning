import Title from "../components/Title"
import SupportForm from "../components/SupportForm"

function Support() {
  const supportInfo = [
    {
      title: "Help Center",
      value: "Browse guides and common questions"
    },
    {
      title: "Support Email",
      value: "support@react-learning.com"
    },
    {
      title: "Response Time",
      value: "Within 24–48 hours"
    },
    {
      title: "Support Hours",
      value: "Mon – Fri, 9:00 AM – 6:00 PM"
    }
  ]

  return (
    <div className="container py-5">
      <Title
        title="Support"
        tagline="Need help? Submit a support request and we’ll get back to you."
      />

      <div className="row g-4">
        <div className="col-md-4">
          {supportInfo.map((item, index) => (
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
              <h5 className="fw-semibold mb-4">Submit a Support Request</h5>
              <SupportForm isSupport={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
