import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { deleteTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import { deleteTodo } from '../../helpers/todosAcess'
import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    console.log(todoId)
    const userId = getUserId(event)
    // TODO: Remove a TODO item by id
    await deleteTodo(todoId,userId)
    logger.info("todo deleted")
    
    return {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
      },
      body: "",
  }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
