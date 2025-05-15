const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware parse JSON body
app.use(express.json());

// Route gửi mail
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Thiếu to, subject hoặc text' });
  }

  // Cấu hình transporter dùng biến môi trường từ Mailtrap
  let transporter = nodemailer.createTransport({
    host: process.env.MT_HOST,
    port: process.env.MT_PORT,
    auth: {
      user: process.env.MT_USER,
      pass: process.env.MT_PASS,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"Vercel Mail" <noreply@example.com>',
      to,
      subject,
      text,
    });

    res.json({ message: 'Gửi mail thành công', info });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi gửi mail', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server chạy port ${port}`);
});
