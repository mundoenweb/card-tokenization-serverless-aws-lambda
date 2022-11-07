import createError from 'http-errors'
import { MiddlewareObj } from '@middy/core'
import { Context, ALBEvent } from 'aws-lambda'

interface IRequest {
  event: ALBEvent | any
  context?: Context
}

export const verifyToken = (): MiddlewareObj<any> => {
  const MiddlewareBefore = (request: IRequest): void => {
    const { event } = request
    const token: string | Error = helperValidToken(event)
    if (token !== undefined) request.event = token
  }

  return {
    before: MiddlewareBefore
  }
}

export const helperValidToken = (event: any): string | Error => {
  const authorizationHeader: string | undefined = event?.headers?.authorization
  const error: string = JSON.stringify({ message: 'Acceso no autorizado' })
  const expToken: RegExp = /^[A-Za-z0-9]+$/

  if (authorizationHeader === undefined) {
    throw createError.Unauthorized(error)
  }

  const token: string = authorizationHeader.split(' ')[1]

  if (token.length !== 16 || !expToken.test(token)) {
    throw createError.Unauthorized(error)
  }

  return token
}
