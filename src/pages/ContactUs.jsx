import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@200;300;400&display=swap');

  .sfm-contact * { box-sizing: border-box; }

  .sfm-contact {
    background: #0a0a0a;
    color: #f0f0f0;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    /* offset for fixed navbar (h-16 = 64px) */
    padding-top: 64px;
  }

  /* Grain overlay */
  .sfm-contact::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.5;
  }

  /* Rusty red ambient background glow */
  .sfm-bg-glow {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(ellipse 70% 55% at 15% 10%,  rgba(160, 40, 25, 0.18) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 85% 80%,  rgba(130, 28, 18, 0.13) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 50% 50%,  rgba(100, 20, 12, 0.07) 0%, transparent 70%);
  }

  /* All content sits above glow */
  .sfm-header,
  .sfm-body {
    position: relative;
    z-index: 1;
  }

  /* ── Fade-up animation ─────────────────── */
  @keyframes sfm-fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .sfm-anim-0 { animation: sfm-fadeUp 0.6s 0.10s ease both; }
  .sfm-anim-1 { animation: sfm-fadeUp 0.6s 0.20s ease both; }
  .sfm-anim-2 { animation: sfm-fadeUp 0.6s 0.30s ease both; }
  .sfm-anim-3 { animation: sfm-fadeUp 0.6s 0.40s ease both; }
  .sfm-anim-4 { animation: sfm-fadeUp 0.6s 0.50s ease both; }

  /* ── Header ───────────────────────────── */
  .sfm-header {
    padding: 3rem 3rem 2rem;
    border-bottom: 1px solid #1e1e1e;
  }

  .sfm-eyebrow {
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #c0392b;
    margin: 0 0 0.75rem;
  }

  .sfm-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 300;
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    line-height: 1.02;
    letter-spacing: -0.03em;
    margin: 0 0 0.5rem;
  }

  .sfm-title em {
    font-style: italic;
    color: #c0392b;
  }

  .sfm-subtitle {
    font-size: 13px;
    font-weight: 300;
    color: #666;
    margin: 0;
  }

  /* ── Body grid ────────────────────────── */
  .sfm-body {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
  }

  /* ── Info panel ───────────────────────── */
  .sfm-info {
    padding: 3rem;
    border-right: 1px solid #1e1e1e;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .sfm-info-label {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #4a4a4a;
    margin: 0 0 0.6rem;
  }

  .sfm-info-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.6;
    margin: 0;
    color: #d0d0d0;
  }

  .sfm-info-value a {
    color: #d0d0d0;
    text-decoration: none;
    border-bottom: 1px solid #2e2e2e;
    transition: border-color 0.2s, color 0.2s;
  }

  .sfm-info-value a:hover {
    color: #f0f0f0;
    border-color: #c0392b;
  }

  .sfm-hours {
    font-size: 12px;
    font-weight: 300;
    color: #666;
    margin: 0.3rem 0 0;
  }

  .sfm-divider {
    width: 24px;
    height: 1px;
    background: #c0392b;
    opacity: 0.6;
  }

  /* ── Form panel ───────────────────────── */
  .sfm-form-wrap {
    padding: 3rem;
  }

  .sfm-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .sfm-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1.5rem;
  }

  .sfm-label {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d0d0d0;
  }

  .sfm-label span {
    color: #c0392b;
    margin-left: 1px;
  }

  .sfm-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid #1e1e1e;
    color: #f7f7f7;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    padding: 0.6rem 0;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }

  .sfm-input::placeholder { color: #8f8f8f; }
  .sfm-input:focus { border-color: #c0392b; }

  .sfm-input.error {
    border-color: #c0392b !important;
    animation: sfm-shake 0.3s ease;
  }

  @keyframes sfm-shake {
    0%, 100% { transform: translateX(0); }
    25%       { transform: translateX(-4px); }
    75%       { transform: translateX(4px); }
  }

  textarea.sfm-input {
    resize: none;
    line-height: 1.6;
  }

  /* ── Button ───────────────────────────── */
  .sfm-btn {
    margin-top: 0.5rem;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    background: transparent;
    border: 1px solid #2e2e2e;
    color: #f0f0f0;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 1rem 2rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.1s;
    cursor: pointer;
  }

  .sfm-btn::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 0;
    background: #c0392b;
    transition: width 0.3s ease;
    z-index: 0;
  }

  .sfm-btn:hover::before { width: 100%; }
  .sfm-btn:hover { border-color: #c0392b; }
  .sfm-btn:active { transform: scale(0.98); }

  .sfm-btn-text,
  .sfm-btn-arrow {
    position: relative;
    z-index: 1;
    transition: transform 0.2s;
  }

  .sfm-btn:hover .sfm-btn-arrow { transform: translateX(4px); }

  /* ── Success ──────────────────────────── */
  .sfm-success {
    margin-top: 1.5rem;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.1rem;
    color: #c0392b;
    animation: sfm-fadeUp 0.5s ease both;
  }

  /* ── Responsive ───────────────────────── */
  @media (max-width: 700px) {
    .sfm-body          { grid-template-columns: 1fr; }
    .sfm-info          { border-right: none; border-bottom: 1px solid #1e1e1e; padding: 2rem; }
    .sfm-form-wrap     { padding: 2rem; }
    .sfm-header        { padding: 2rem 2rem 1.5rem; }
    .sfm-field-row     { grid-template-columns: 1fr; }
  }
`;

function ContactUs() {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.entries(fields).forEach(([key, val]) => {
      if (!val.trim()) newErrors[key] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const subject = encodeURIComponent(
      `Soul FM Contact – ${fields.firstName} ${fields.lastName}`
    );
    const body = encodeURIComponent(
      `Name: ${fields.firstName} ${fields.lastName}\nEmail: ${fields.email}\nPhone: ${fields.phone}\n\nMessage:\n${fields.message}`
    );
    window.location.href = `mailto:anzelbotin@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="sfm-contact">

        {/* Ambient rusty red glow — sits behind everything */}
        <div className="sfm-bg-glow" />

        {/* Header */}
        <header className="sfm-header">
          <p className="sfm-eyebrow sfm-anim-0">Soul FM · San Bernardino, CA</p>
          <h1 className="sfm-title sfm-anim-1">
            Get in <em>Touch</em>
          </h1>
          <p className="sfm-subtitle sfm-anim-2">
            Throwback radio, worldwide. We'd love to hear from you.
          </p>
        </header>

        <div className="sfm-body">

          {/* Info panel */}
          <aside className="sfm-info sfm-anim-3">
            <div>
              <p className="sfm-info-label">Phone</p>
              <p className="sfm-info-value">
                <a href="tel:9097479521">(909) 747-9521</a>
                <br />
                <a href="tel:9098930169">(909) 893-0169</a>
              </p>
            </div>

            <div className="sfm-divider" />

            <div>
              <p className="sfm-info-label">Location</p>
              <p className="sfm-info-value">
                San Bernardino, CA
                <br />
                92411
              </p>
            </div>

            <div className="sfm-divider" />

            <div>
              <p className="sfm-info-label">Hours</p>
              <p className="sfm-info-value">Mon – Sun</p>
              <p className="sfm-hours">7:00 am – 10:00 pm</p>
            </div>

            <div className="sfm-divider" />

            <div>
              <p className="sfm-info-label">Email</p>
              <p className="sfm-info-value">
                <a href="mailto:anzelbotin@gmail.com">anzelbotin@gmail.com</a>
              </p>
            </div>
          </aside>

          {/* Form panel */}
          <section className="sfm-form-wrap sfm-anim-4">

            <div className="sfm-field-row">
              <div className="sfm-field">
                <label className="sfm-label">First Name <span>*</span></label>
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
                <label className="sfm-label">Last Name <span>*</span></label>
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
                <label className="sfm-label">Email <span>*</span></label>
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
                <label className="sfm-label">Phone <span>*</span></label>
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
              <label className="sfm-label">Message <span>*</span></label>
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
                Message sent — we'll tune in soon.
              </p>
            )}

          </section>
        </div>
      </div>
    </>
  );
}

export default ContactUs;