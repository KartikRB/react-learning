import { useState, useEffect } from "react";
import Header from "../../../components/admin/Header";
import api from "../../../api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const actions = [
    { label: "Back", onClick: () => navigate("/admin/faqs"), variant: "btn-outline-primary btn-sm fw-bold" },
  ];

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/faqs/${id}`)
        .then(res => {
            if(res.status){
              const faq = res.data.data;
              setFormData({
                question: faq.question ?? "",
                answer: faq.answer ?? "",
              });
              
            }
        })
        .catch(() => toast.error("Failed to load faq"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const data = new FormData();

    data.append("question", formData.question);
    data.append("answer", formData.answer);

    try {
      const response = await api.post(id ? "/faqs/" + id + "?_method=PUT" : "/faqs", data, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });

      if(response.status){
          toast.success(response.data.message || "Faq created successfully!");

          setFormData({
            question: "",
            answer: "",
          });
  
          navigate("/admin/faqs");
      }else{
          toast.error(response.data.message || "Faq not found!");
      }
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
    <div>
      <Header title={id ? "Edit Faq" : "Create Faq"} actions={actions} />
  
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">

                <div className="col-12 mb-3">
                    <label htmlFor="question" className="form-label required">Question</label>
                    <input type="text" id="question" name="question" className={`form-control ${errors.question ? "is-invalid" : ""}`} value={formData.question} onChange={handleChange} placeholder="Enter question" />
                    {errors.question && <div className="invalid-feedback">{errors.question[0]}</div>}
                </div>

                <div className="col-12 mb-3">
                    <label htmlFor="answer" className="form-label required">Answer</label>
                    <textarea id="answer" name="answer" className={`form-control ${errors.answer ? "is-invalid" : ""}`} value={formData.answer} onChange={handleChange} placeholder="answer..." rows={4} />
                    {errors.answer && <div className="invalid-feedback">{errors.answer[0]}</div>}
                </div>

            </div>
            <div className="text-end">
                <button type="submit" className="btn btn-primary fw-bold" disabled={loading}>
                    {id ? "Update" : "Create"}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Form;