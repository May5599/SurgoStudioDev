import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
    }

    // 🧩 Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL, // e.g. raha@surgomedia.com
        pass: process.env.CONTACT_PASS,  // 16-character app password
      },
    });

    // 📨 Email content
    const mailOptions = {
      from: `"Surgo Studios Contact" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL, // send to manager inbox
      subject: `📩 New Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Message:
        ${message}
      `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email send failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
