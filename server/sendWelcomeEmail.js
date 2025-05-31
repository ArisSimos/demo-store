import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

export async function sendWelcomeEmail({ to, name }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"BookHaven" <${EMAIL_USER}>`,
    to,
    subject: 'Καλωσορίσατε στο BookHaven!',
    html: `
      <h2>Καλωσορίσατε, ${name}!</h2>
      <p>Σας ευχαριστούμε που εγγραφήκατε στο BookHaven. Καλή ανάγνωση!</p>
    `
  });
}
