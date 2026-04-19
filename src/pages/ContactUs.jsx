import styles from "../components/ContactUsComponents/contactUsStyles";
import ContactHeader from "../components/ContactUsComponents/ContactHeader";
import ContactInfo from "../components/ContactUsComponents/ContactInfo";
import ContactForm from "../components/ContactUsComponents/ContactForm";

function ContactUs() {
  return (
    <>
      <style>{styles}</style>

      <div className="sfm-contact">
        <div className="sfm-bg-glow" />

        <ContactHeader />

        <div className="sfm-body">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default ContactUs;