import { toast } from "react-toastify";
import { useState } from "react";
import api from "../api/Axios";


function SupportForm({ isSupport }) {

    const type = isSupport ? "support" : "contact";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [issue_type, setIssueType] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const response = await api.post("/support-post", {
                name,
                type,
                email,
                issue_type,
                subject,
                description
            });

            toast.success(response.data.message || "Submitted successfully!");

            setName("");
            setEmail("");
            setIssueType("");
            setSubject("");
            setDescription("");

        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                toast.error("Something went wrong. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
                <input type="text" name="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
            </div>
            <div className="col-md-6">
                <input type="email" name="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
            </div>
        </div>

        {isSupport && (
            <div className="mb-3">
                <select className={`form-select ${errors.issue_type ? "is-invalid" : ""}`} name="issue_type" value={issue_type} onChange={(e) => setIssueType(e.target.value)}>
                    <option value="">Select Issue Type</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Problem</option>
                    <option value="billing">Billing Question</option>
                    <option value="other">Other</option>
                </select>
                {errors.issue_type && <div className="invalid-feedback">{errors.issue_type[0]}</div>}
            </div>
        )}

        <div className="mb-3">
            <input type="text" name="subject" className={`form-control ${errors.subject ? "is-invalid" : ""}`} placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
            {errors.subject && <div className="invalid-feedback">{errors.subject[0]}</div>}
        </div>

        <div className="mb-4">
            <textarea name="description" className={`form-control ${errors.description ? "is-invalid" : ""}`} rows="5" placeholder={isSupport ? "Describe your issue" : "Your Message"} onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description[0]}</div>}
        </div>

        <button type="submit" className="btn btn-primary px-4" disabled={loading}>
            Submit
        </button>
    </form>
  )
}

export default SupportForm
