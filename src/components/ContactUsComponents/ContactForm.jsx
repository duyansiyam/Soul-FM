import { useState } from "react";

function ContactForm() {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const recipientEmail = "justdoinitentertainment9@gmail.com";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFields((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(fields).forEach(([key, val]) => {
      if (!String(val).trim()) newErrors[key] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }

    setLoading(true);
    setSubmitted(false);

    const formData = new FormData();
    formData.append("access_key", "085b1def-60c6-4ede-a317-447945b281ce");
    formData.append("subject", `Soul FM Contact Form - ${fields.firstName} ${fields.lastName}`);
    formData.append("from_name", `${fields.firstName} ${fields.lastName}`);
    formData.append("replyto", fields.email);

    formData.append("First Name", fields.firstName);
    formData.append("Last Name", fields.lastName);
    formData.append("Email", fields.email);
    formData.append("Phone", fields.phone);
    formData.append("Message", fields.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFields({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Unable to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sfm-form-wrap sfm-anim-4">
      <form onSubmit={handleSubmit}>
        <div className="sfm-field-row">
          <div className="sfm-field">
            <label className="sfm-label">
              First Name <span>*</span>
            </label>
            <input
              className={`sfm-input${errors.firstName ? " error" : ""}`}
              name="firstName"
              type="text"
              placeholder="Soul"
              value={fields.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="sfm-field">
            <label className="sfm-label">
              Last Name <span>*</span>
            </label>
            <input
              className={`sfm-input${errors.lastName ? " error" : ""}`}
              name="lastName"
              type="text"
              placeholder="Listener"
              value={fields.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sfm-field-row">
          <div className="sfm-field">
            <label className="sfm-label">
              Email <span>*</span>
            </label>
            <input
              className={`sfm-input${errors.email ? " error" : ""}`}
              name="email"
              type="email"
              placeholder="you@example.com"
              value={fields.email}
              onChange={handleChange}
            />
          </div>

          <div className="sfm-field">
            <label className="sfm-label">
              Phone <span>*</span>
            </label>
            <input
              className={`sfm-input${errors.phone ? " error" : ""}`}
              name="phone"
              type="tel"
              placeholder="(909) 000-0000"
              value={fields.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <p className="sfm-selected-email">
          This message will be sent to: <strong>{recipientEmail}</strong>
        </p>

        <div className="sfm-field">
          <label className="sfm-label">
            Message <span>*</span>
          </label>
          <textarea
            className={`sfm-input${errors.message ? " error" : ""}`}
            name="message"
            placeholder="What's on your mind?"
            rows={4}
            value={fields.message}
            onChange={handleChange}
          />
        </div>

        <button className="sfm-btn" type="submit" disabled={loading}>
          <span className="sfm-btn-text">
            {loading ? "Sending..." : "Send Message"}
          </span>
          <span className="sfm-btn-arrow">→</span>
        </button>

        {submitted && (
          <p className="sfm-success">
            Message sent successfully — we&apos;ll tune in soon.
          </p>
        )}
      </form>
    </section>
  );
}

export default ContactForm;