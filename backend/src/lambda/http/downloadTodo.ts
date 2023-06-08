import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { getDownloadUrl } from '../../businessLayer/todos';


export const handler =
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const todoId = event.pathParameters.todoId
      // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
      const downloadUrl = await getDownloadUrl(todoId);

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          url: downloadUrl
        })
      }
    } catch (e) {
      let message: string;
      if (typeof e === "string") {
        message = e.toUpperCase() // works, `e` narrowed to string
      } else if (e instanceof Error) {
        message = e.message // works, `e` narrowed to Error
      }
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          error: message
        })
      }
    }
  }
