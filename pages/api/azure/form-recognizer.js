import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
import { createDefaultRouter } from "@/lib/router.js";
import fs from 'fs';

const router = createDefaultRouter();

router.get(async (req, res) => {
//   const { DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
// const { DefaultAzureCredential } = require("@azure/identity");

  // const client = new DocumentAnalysisClient("<your-endpoint>", new DefaultAzureCredential());

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

export default router.getHandler();
