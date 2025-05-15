const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const nodemailer = require('nodemailer');

// Tạo transporter dùng thông tin từ Mailtrap
const transporter = nodemailer.createTransport({
  host: process.env.MT_HOST,
  port: process.env.MT_PORT,
  auth: {
    user: process.env.MT_USER,
    pass: process.env.MT_PASS
  }
});

// Gửi mail mỗi 10 giây
setInterval(() => {
  const mailOptions = {
    from: '"Render Worker" <noreply@example.com>',
    to: 'ng.thanhthao0207e@gmail.com',
    subject: 'Mailtrap Test Email',
    text: 'Chào em, đây là email test từ Background Worker trên Render!'
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Lỗi khi gửi mail:', err);
    } else {
      console.log('Đã gửi email:', info.response);
    }
  });
}, 10000);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
