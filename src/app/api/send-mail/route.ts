import { Contact } from "@/components/contact/helpers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body: Contact = await req.json();
  const { fullName, email, message, workType, phone } = body;

  if (!fullName || !email || !workType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true, // true for port 465, false for 587
    auth: {
      user: process.env.NEXT_PUBLIC_MAIL_USER as string,
      pass: process.env.NEXT_PUBLIC_MAIL_PASS as string,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${fullName}" <${email}>`,
      to: process.env.NEXT_PUBLIC_MAIL_USER as string,
      // cc: "danicrqa@gmail.com",
      subject: `${fullName} wants a quote for '${workType}'`,
      text: message,
      html: `
      <div style="max-width: 600px; margin: auto; font-family: 'Arial', sans-serif; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #000; padding: 20px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0; font-size: 24px;">New Quote Request</h1>
        </div>

        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; color: #333;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Full Name:</td>
              <td style="padding: 8px;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>

            ${
              phone
                ? `
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Phone:</td>
              <td style="padding: 8px;">  <a href="tel:${phone
                .trim()
                .replaceAll("-", "")
                .replaceAll(" ", "")}">${phone}</a></td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Work Type:</td>
              <td style="padding: 8px;">${workType}</td>
            </tr>
            ${
              message
                ? `
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #000;">Message:</td>
              <td style="padding: 8px; white-space: pre-line;">${message}</td>
            </tr>`
                : ""
            }
          </table>

          <p style="font-size: 12px; color: #999; margin-top: 24px;">
            This request was submitted via the Imperial Home Remodeling website.
          </p>
        </div>

        <div style="background-color: #000; text-align: center; padding: 12px;">
          <p style="color: #d4af37; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Imperial Home Remodeling</p>
        </div>
      </div>
    `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Email failed to send" },
      { status: 500 }
    );
  }
}
