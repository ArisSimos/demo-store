import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

export async function generateInvoicePdf({ shopTitle, orderId, email, books, total, date }) {
  const doc = new PDFDocument({ margin: 40 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  // Title
  doc.fontSize(20).text(shopTitle, { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Ημερομηνία: ${date}`);
  doc.text(`Αριθμός Παραγγελίας: ${orderId}`);
  doc.text(`Email Πελάτη: ${email}`);
  doc.moveDown();

  // Books Table
  doc.fontSize(14).text('Στοιχεία Παραγγελίας:', { underline: true });
  doc.moveDown(0.5);
  books.forEach((book, i) => {
    doc.fontSize(12).text(`${i + 1}. ${book.title} (ISBN: ${book.isbn}) - €${book.price.toFixed(2)}`);
  });
  doc.moveDown();
  doc.fontSize(14).text(`Σύνολο: €${total.toFixed(2)}`, { align: 'right' });

  // QR Code
  const qrPayload = JSON.stringify({ orderId, email, total });
  const qrDataUrl = await QRCode.toDataURL(qrPayload);
  const qrImage = qrDataUrl.replace(/^data:image\/png;base64,/, "");
  doc.addPage();
  doc.fontSize(16).text('QR Code Παραγγελίας', { align: 'center' });
  doc.moveDown();
  doc.image(Buffer.from(qrImage, 'base64'), { fit: [200, 200], align: 'center' });

  doc.end();

  return Buffer.concat(buffers);
}
