"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const buckname = process.env.BUCKET_NAMEX;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.BUCKET_ACCESS_KEYX;
const secretAccessKey = process.env.BUCKET_SECRET_KEYX;
const s3 = new S3({ region, accessKeyId, secretAccessKey });
//upload to s3
function uploadFileTos3(file) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: buckname,
        Body: fileStream,
        Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
}
exports.uploadFileTos3 = uploadFileTos3;
//download from s3
function getFileStreamFroms3(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: buckname,
    };
    return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStreamFroms3 = getFileStreamFroms3;
