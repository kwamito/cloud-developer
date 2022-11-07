import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')

const XAWS = AWSXRay.captureAWS(AWS)
const s3 = new XAWS.S3({
    signatureVersion: 'v4'
  })
const bucketName = process.env.ATTACHMENT_S3_BUCKET

// TODO: Implement the fileStogare logic
export function getUploadUrl(todoId: string):string{
    return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: todoId,
      Expires: 1000,
    }) as string
  }
  