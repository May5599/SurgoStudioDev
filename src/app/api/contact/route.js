// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req) {
//   try {
//     const { name, email, phone, message } = await req.json();

//     if (!name || !email || !message) {
//       return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
//     }

//     // 🧩 Gmail SMTP transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.CONTACT_EMAIL, // e.g. raha@surgomedia.com
//         pass: process.env.CONTACT_PASS,  // 16-character app password
//       },
//     });

//     // 📨 Email content
//     const mailOptions = {
//       from: `"Surgo Studios Contact" <${process.env.CONTACT_EMAIL}>`,
//       to: process.env.CONTACT_EMAIL, // send to manager inbox
//       subject: `📩 New Message from ${name}`,
//       text: `
//         Name: ${name}
//         Email: ${email}
//         Phone: ${phone || "N/A"}
//         Message:
//         ${message}
//       `,
//     };

//     // ✅ Send email
//     await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully");

//     return NextResponse.json({ success: true, message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("❌ Email send failed:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, phone, message, captchaToken, website } = body;

    // ✅ Honeypot (hidden field for bots)
    if (website) {
      return NextResponse.json({ success: true }); // silently ignore bots
    }

    // ✅ Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    // ✅ CAPTCHA check
    if (!captchaToken) {
      return NextResponse.json(
        { success: false, error: "Captcha missing." },
        { status: 400 }
      );
    }

    // 🔐 Verify CAPTCHA with Google
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`,
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { success: false, error: "Captcha failed." },
        { status: 400 }
      );
    }

    // 📧 Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASS,
      },
    });

    // 📨 Email content
    const mailOptions = {
      from: `"Surgo Studios Contact" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `📩 New Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error("❌ Email send failed:", error);

    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}