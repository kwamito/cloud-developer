import { CreateTodoRequest } from '../requests/CreateTodoRequest'

import * as uuid from 'uuid'
import { APIGatewayProxyEvent } from 'aws-lambda';
import { getUserId } from '../lambda/utils';


export function todoBuilder(todoRequest: CreateTodoRequest,event: APIGatewayProxyEvent){
    const todoId = uuid.v4()
    const s3BucketName = process.env.ATTACHMENT_S3_BUCKET;

    const todo = {
      todoId: todoId,
      userId: getUserId(event),
      createdAt: new Date().toISOString(),
      attachmentUrl:  `https://${s3BucketName}.s3.amazonaws.com/${todoId}`, 
      done: false,
      ...todoRequest
    }

    return todo
}
