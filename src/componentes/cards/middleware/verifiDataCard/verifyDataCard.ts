import createError from 'http-errors'
import { MiddlewareObj } from '@middy/core'
import { Context, ALBEvent } from 'aws-lambda'
import { newCard } from '../../types/interface'
import * as dataParse from './helper/helperValidatingCardFieldsAndParseData'

interface IRequest {
  event: ALBEvent | any
  context?: Context
}

export const verifyDataCard = (): MiddlewareObj<any> => {
  const MiddlewareBefore = (request: IRequest): void => {
    const { event } = request
    const data: any = event.body

    const card = helperMiddlewareVerifiDataCard(data)
    request.event = card
  }

  return {
    before: MiddlewareBefore
  }
}

export const helperMiddlewareVerifiDataCard = (data: any): newCard | Error => {
  try {
    if (Object.keys(data).length === 0 || data === undefined) {
      throw new Error('Debe enviar todos los datos')
    }

    const card: newCard = {
      email: dataParse.parseEmail(data.email),
      cvv: dataParse.parseCVV(data.cvv),
      expiration_month: dataParse.parseExpMonth(data.expiration_month),
      expiration_year: dataParse.parseExpYear(data.expiration_year),
      card_number: dataParse.parseCard(data.card_number)
    }

    return card
  } catch (error: any) {
    const message: string = error.message
    throw createError.BadRequest(JSON.stringify({ message }))
  }
}
