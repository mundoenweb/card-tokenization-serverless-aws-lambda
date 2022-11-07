import middy from '@middy/core'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { verifyToken } from './middleware/verifyToken/verifyToken'
import httpErrorHandler from '@middy/http-error-handler'
import { getCardService } from './service/cardService'
import { helperResponse, helperResponseError } from '../../helper/helperResponse'

export const getCardController = middy(async (token: string): Promise<any> => {
  try {
    const response = await getCardService(token)
    return helperResponse(response)
  } catch (error: any) {
    return helperResponseError(error)
  }
})

getCardController
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser())
  .use(verifyToken())
  .use(httpErrorHandler())
