import * as data from './helper/helperTest'
import { helperMiddlewareVerifiDataCard } from './verifyDataCard'

describe('pruebas middleware validador de tarjetas', () => {
  test('probando data tarjeta valida', () => {
    expect(helperMiddlewareVerifiDataCard(data.cardValid))
      .toStrictEqual(data.responseOK)
  })
  test('probando sin enviar ningún dato', () => {
    expect(() => helperMiddlewareVerifiDataCard({}))
      .toThrow('Debe enviar todos los datos')
  })
  test('probando con email invalido', () => {
    expect(() => helperMiddlewareVerifiDataCard(data.cardEmailInvalid))
      .toThrow('Email incorrect')
  })
  test('probando con cvv invalido', () => {
    expect(() => helperMiddlewareVerifiDataCard(data.cardCVVInvalid))
      .toThrow('CVV incorrect')
  })
  test('probando con mes invalido', () => {
    expect(() => helperMiddlewareVerifiDataCard(data.cardMonthInvalid))
      .toThrow('Month incorrect')
  })
  test('probando con año invalido', () => {
    expect(() => helperMiddlewareVerifiDataCard(data.cardYearInvalid))
      .toThrow('Year incorrect')
  })
  test('probando con numero de tarjeta invalido', () => {
    expect(() => helperMiddlewareVerifiDataCard(data.cardNumberInvalid))
      .toThrow('Card number is incorrect')
  })
})
