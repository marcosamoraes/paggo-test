import { AnalyzeExpenseCommand, TextractClient } from "@aws-sdk/client-textract";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const SQS_QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/060954962271/InvoiceExtractionDone";

const textractClient = new TextractClient();
const sqsClient = new SQSClient();

export const handler = async (event) => {
  
  const s3Info = event.Records[0].s3;
  const bucket = s3Info.bucket.name;
  const file = s3Info.object.key;
  
  try {
    const textractParams = {
      Document: {
        S3Object: {
          Bucket: bucket,
          Name: file
        },
      },
    };

    const analyzeCommand = new AnalyzeExpenseCommand(textractParams);
    
    const textractResponse = await textractClient.send(analyzeCommand);

    const extractedData = {
      file,
      invoiceNumber: null,
      invoiceDate: null,
      dueDate: null,
      balanceDue: null,
    };

    textractResponse.ExpenseDocuments.forEach((doc) => {
      doc.SummaryFields.forEach((field) => {
        const label = field.Type?.Text;
        const value = field.ValueDetection?.Text;

        switch(label) {
          case 'INVOICE_RECEIPT_ID':
            extractedData.invoiceNumber = value;
            break;
          case 'INVOICE_RECEIPT_DATE':
            extractedData.invoiceDate = new Date(value).toISOString();
            break;
          case 'DUE_DATE':
            extractedData.dueDate = new Date(value).toISOString();
            break;
          case 'AMOUNT_DUE':
            extractedData.balanceDue = convertToFloat(value);
            break;
        }
      });
    });

    const sqsParams = {
      QueueUrl: SQS_QUEUE_URL,
      MessageBody: JSON.stringify(extractedData),
    };

    const sendCommand = new SendMessageCommand(sqsParams);
    await sqsClient.send(sendCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Process completed successfully", 
        data: extractedData 
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        bucket,
        file,
        error: err.message 
      }),
    };
  }
};

const convertToFloat = (currencyString) => {
    // Remove currency symbols and non-numeric characters except for the decimal point
    let standardizedString = currencyString.replace(/[^\d,.-]/g, '');

    // Detect and handle thousands separator
    standardizedString = standardizedString.replace(/(\d),(?=\d{3}(\D|$))/g, '$1');

    // Replace comma used as decimal separator with period, if present
    standardizedString = standardizedString.replace(',', '.');

    return parseFloat(standardizedString);
}