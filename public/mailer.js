import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendNotificationEmail(subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO, // Сіздің жеке поштаңыз
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 Хабарлама жіберілді');
  } catch (error) {
    console.error('❌ Хат жіберу қатесі:', error);
  }
}
