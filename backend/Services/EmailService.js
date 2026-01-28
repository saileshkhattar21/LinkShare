import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Your App" <${process.env.MAIL_USERNAME}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `<h3>Your OTP is: <b>${otp}</b></h3><p>Valid for 10 minutes.</p>`,
  });
};
