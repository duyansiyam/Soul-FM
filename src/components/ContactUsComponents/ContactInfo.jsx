function ContactInfo() {
  return (
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
        <p className="sfm-info-label">Main Email</p>
        <p className="sfm-info-value">
          <a href="mailto:inquiries.soulfm@gmail.com">
            inquiries.soulfm@gmail.com
          </a>
        </p>
      </div>
    </aside>
  );
}

export default ContactInfo;