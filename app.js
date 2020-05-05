const data = require("./data.json");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const SVGtoPDF = require("svg-to-pdfkit");
const Barc = require("barcode-generator");

const doc = new PDFDocument();
const barc = new Barc();

data.image = barc.code128(data.order.id, 465, 125).toString('base64')

const svg = require("./template.js")(data.order, data.delivery, data.return, data.image);

async function log() {
  await doc.pipe(fs.createWriteStream("output.pdf"));
  SVGtoPDF(doc, svg, 0, 0);
  doc.end();
  console.log("wrote it")
}
log()