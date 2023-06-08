import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
import { createDefaultRouter } from "@/lib/router.js";
import { saveFileToLocal } from "@/lib/uploadFile.js";
import formidable from 'formidable';
import fs from 'fs';

const router = createDefaultRouter();

router.get(async (req, res) => {
  const client = new DocumentAnalysisClient(
    process.env.AZURE_FORM_RECOGNIZER_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_FORM_RECOGNIZER_KEY)
  );

  const path = "./public/uploads/receipt-sample.pdf";
  const modelId = "prebuilt-receipt";

  const readStream = fs.createReadStream(path);

  const poller = await client.beginAnalyzeDocument(modelId, readStream, {
    onProgress: ({ status }) => {
      console.log(`status: ${status}`);
    },
  });

  // There are more fields than just these three
  const analyzeResult = await poller.pollUntilDone();

  return res.status(200).json({
    message: "reading success",
    result: analyzeResult
  });

});

router.post(async (req, res) => {
  const form = new formidable.IncomingForm({
    allowEmptyFiles: false,
  });

  const formPromise = await new Promise((resolve, reject) => {
    form.on('fileBegin', (formName, file) => {
      const mimetype = file.mimetype;
      console.log(mimetype)
      if (!(mimetype && (mimetype.includes("image") || mimetype.includes("pdf") || mimetype.includes("doc")) )) {
        const errorValidation = new Error('File type is not supported');
        errorValidation.code = 400;
        reject(errorValidation);
      }
    });

    form.parse(req, async function (errFile, fields, files) {
      if (errFile!=null) {
        errFile.code = 400;
        reject(errFile);
      }

      try {
        const fileLink = await saveFileToLocal(files.document);

        const client = new DocumentAnalysisClient(
          process.env.AZURE_FORM_RECOGNIZER_ENDPOINT,
          new AzureKeyCredential(process.env.AZURE_FORM_RECOGNIZER_KEY)
        );

        const path = `./public${fileLink}`;
        const modelId = "prebuilt-document";

        const readStream = fs.createReadStream(path);

        const poller = await client.beginAnalyzeDocument(modelId, readStream, {
          onProgress: ({ status }) => {
            console.log(`status: ${status}`);
          },
        });

        // There are more fields than just these three
        const analyzeResult = await poller.pollUntilDone();

        resolve({
          message: "analyzing success",
          result: analyzeResult
        });

      } catch (errSave) {
        errSave.code = 500;
        reject(errSave);
      }
    })
  });

  return res.status(201).json(formPromise);

});

export const config = {
  api: {
    bodyParser: false
  },
};

export default router.getHandler();
