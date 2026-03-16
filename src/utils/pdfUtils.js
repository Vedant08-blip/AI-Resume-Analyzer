import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?worker&url";

GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await getDocument({
    data: arrayBuffer,
  }).promise;

  let textContent = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const text = await page.getTextContent();
    const pageText = text.items.map((item) => item.str).join(" ");
    textContent += pageText + "\n";
  }

  return textContent;
}

