import { useState } from "react";
import inquiryOptions from "./inquiryOptions";

function ContactForm() {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "general",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const selectedEmail = inquiryOptions[fields.inquiryType].email;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.entries(fields).forEach(([key, val]) => {
      if (!String(val).trim()) newErrors[key] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }

    const subject = encodeURIComponent(
      `Soul FM Contact – ${inquiryOptions[fields.inquiryType].label} – ${fields.firstName} ${fields.lastName}`
    );

    const body = encodeURIComponent(
      `Inquiry Type: ${inquiryOptions[fields.inquiryType].label}
To: ${selectedEmail}

Name: ${fields.firstName} ${fields.lastName}
Email: ${fields.email}
Phone: ${fields.phone}

Message:
${fields.message}`
    );

    window.location.href = `mailto:${selectedEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="sfm-form-wrap sfm-anim-4">
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

      <div className="sfm-field">
        <label className="sfm-label">
          Inquiry Type <span>*</span>
        </label>
        <select
          className={`sfm-input${errors.inquiryType ? " error" : ""}`}
          name="inquiryType"
          value={fields.inquiryType}
          onChange={handleChange}
        >
          <option value="general">General Inquiry</option>
          <option value="advertising">Advertising</option>
          <option value="songRequest">Song Request</option>
        </select>
      </div>

      <p className="sfm-selected-email">
        This message will be sent to: <strong>{selectedEmail}</strong>
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

      <button className="sfm-btn" onClick={handleSubmit}>
        <span className="sfm-btn-text">Send Message</span>
        <span className="sfm-btn-arrow">→</span>
      </button>

      {submitted && (
        <p className="sfm-success">
          Message prepared — we&apos;ll tune in soon.
        </p>
      )}
    </section>
  );
}

export default ContactForm;
