import { client } from '../../../config/connection'
import { createTokenAndSaveCard, getCardService } from './cardService'
import { card, DBCard, expToken, msgErrorToken, tokenCorrect, tokenIncorrect } from './helper/helperTest'

describe('pruebas servicio createTokenAndSaveCard -- las test con datos invalidos validos estan comprobados en verifiDataCard.test.ts', () => {
  test('datos validos', async () => {
    const data: any = card
    const { token }: any = await createTokenAndSaveCard(data)
    expect(token).toMatch(expToken)
  })
})
describe('pruebas servicio getCardService', () => {
  test('probanco con token valido', async () => {
    const response = await getCardService(tokenCorrect)
    expect(response).toStrictEqual(DBCard)
  })
  test('probanco con token expirado o inexistente', async () => {
    try {
      await getCardService(tokenIncorrect)
    } catch (error: any) {
      expect(error.message.message).toBe(msgErrorToken)
    }
  })
})

afterAll(async () => {
  await client.close()
})
