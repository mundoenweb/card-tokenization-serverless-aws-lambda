import middy from '@middy/core'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import { helperResponse, helperResponseError } from '../../helper/helperResponse'
import { createTokenAndSaveCard } from './service/cardService'
import { verifyDataCard } from './middleware/verifiDataCard/verifyDataCard'
import { newCard } from './types/interface'

export const createTokenController = middy(async (data: newCard): Promise<any> => {
  try {
    const response = await createTokenAndSaveCard(data)
    const message: string = 'Token creado exitosamente'
    return helperResponse(response, 201, message)
  } catch (error: any) {
    return helperResponseError(error)
  }
})

createTokenController
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser())
  .use(verifyDataCard())
  .use(httpErrorHandler())
