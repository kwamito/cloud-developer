import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../helpers/todosAcess'
import { todoBuilder } from '../../helpers/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    console.log(newTodo)
    const todo = todoBuilder(newTodo,event)
    await createTodo(todo)
    logger.info("todo created")
   

    return {
      statusCode: 201,
      body: JSON.stringify({
        "item":todo
      })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)
