export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-4xl font-semibold md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mb-10 text-sm text-white/45">
          Effective date: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-[15px] leading-8 text-white/72">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Introduction
            </h2>
            <p>
              Soul FM values your privacy and is committed to protecting any
              personal information you share with us through our website. This
              Privacy Policy explains what information we collect, how we use
              it, and the choices you have regarding your information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Information We Collect
            </h2>
            <p className="mb-3">
              We may collect information from you in the following ways:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-white/72">
              <li>
                Information you provide directly, such as your name, email
                address, phone number, subject, category, and message when you
                contact us through our website.
              </li>
              <li>
                Basic technical information such as browser type, device type,
                pages visited, and general usage data when you browse the site.
              </li>
              <li>
                Information stored through cookies or similar technologies to
                improve your browsing experience and remember preferences.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              How We Use Your Information
            </h2>
            <p className="mb-3">
              Soul FM may use the information we collect to:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-white/72">
              <li>Respond to inquiries, booking requests, and messages.</li>
              <li>Improve our website, services, and user experience.</li>
              <li>
                Maintain communication regarding station updates, services, or
                relevant responses to your request.
              </li>
              <li>Monitor website performance and general traffic trends.</li>
              <li>
                Help keep the website secure and prevent spam or misuse.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Cookies and Similar Technologies
            </h2>
            <p>
              Our website may use cookies and similar technologies to improve
              functionality, remember preferences, and better understand how
              visitors use the site. When required, we provide a cookie banner
              so you can choose whether to accept or reject non-essential
              cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Third-Party Services
            </h2>
            <p className="mb-3">
              We may use trusted third-party services to support the operation
              of the Soul FM website. These services may include tools for:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-white/72">
              <li>Contact form delivery, such as EmailJS.</li>
              <li>Website hosting and deployment.</li>
              <li>Embedded content, social media links, or media players.</li>
              <li>Analytics or performance monitoring, if enabled.</li>
            </ul>
            <p className="mt-3">
              These third-party services may process certain data according to
              their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Sharing of Information
            </h2>
            <p>
              Soul FM does not sell your personal information. We may share
              limited information only when necessary to operate our website,
              respond to your request, comply with legal obligations, or protect
              our rights, users, and services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Data Retention
            </h2>
            <p>
              We keep personal information only for as long as needed to fulfill
              the purposes described in this Privacy Policy, including responding
              to inquiries, maintaining records, improving services, and meeting
              legal or operational requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Your Choices and Rights
            </h2>
            <p className="mb-3">
              Depending on your location, you may have rights regarding your
              personal information, including the right to:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-white/72">
              <li>Request access to information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your information, where applicable.</li>
              <li>Manage cookie preferences through your browser or banner settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Children’s Privacy
            </h2>
            <p>
              Soul FM does not knowingly collect personal information from
              children without appropriate consent where required by law. If you
              believe a child has provided personal information through our
              website, please contact us so we can review and remove it if
              necessary.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to our services, website features, or legal requirements.
              Any updates will be posted on this page with a revised effective
              date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or how your
              information is handled, please contact Soul FM through our website
              contact page or the contact details provided on the site.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}