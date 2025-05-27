import axios from 'axios';

async function sendPurchaseVerificationEmail({ to, productName, orderId }) {
  const apiKey = 'mlsn.e8edd73bc47392cf5edce4d328633c4bce42a1bb45fdfd4c33a5781cbcc3c74d';

  const books = productName.split(', ');
  const isbns = orderId.split(', ');

  const bookList = books.map((book, idx) => {
    const isbn = isbns[idx] || '';
    return `<li>${book} <br /><small>ISBN: ${isbn}</small></li>`;
  }).join('');

  const data = {
    to: [to],
    subject: 'Your BookHaven Purchase Verification',
    html: `
      <h2>Thank you for your purchase!</h2>
      <p>You bought:</p>
      <ul>
        ${bookList}
      </ul>
      <p>If you have any questions, reply to this email.</p>
    `,
    from: 'MS_fVxSqW@test-zxk54v87mm6ljy6v.mlsender.net',
  };

  console.log('Sending email with data:', data);

  await axios.post('https://api.mailsend.com/v1/email/send', data, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });
}

export default sendPurchaseVerificationEmail;