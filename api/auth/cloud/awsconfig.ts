import AWS from "aws-sdk";
AWS.config.update({ region: "ap-south-1" });
const ses = new AWS.SES({
    region: "ap-south-1",
    accessKeyId: "AKIA42SUSLOIC4LIV5FH",
    secretAccessKey: "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",
  });