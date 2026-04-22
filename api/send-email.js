import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, message } = await request.json();

    if (!firstName || !lastName || !email || !phone || !message) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const safeMessage = String(message)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");

    const { data, error } = await resend.emails.send({
      from: "Soul FM <noreply@justdoinitentertainment.com>",
      to: ["inquiries.soulfm@gmail.com"],
      replyTo: email,
      subject: `Soul FM Contact Form - ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      return Response.json(
        { error: error.message || "Failed to send email." },
        { status: 400 }
      );
    }

    return Response.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: err.message || "Failed to send email." },
      { status: 500 }
    );
  }
}