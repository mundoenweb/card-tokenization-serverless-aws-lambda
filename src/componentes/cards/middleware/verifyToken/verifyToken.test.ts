import { helperValidToken } from './verifyToken'

describe('pruebas middleware verificacion de token', () => {
  test('validando token valido', () => {
    const token: string = 'Tprp3yINrIxFIfbo'
    const event = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    expect(helperValidToken(event)).toBe(token)
  })
  test('validando sin enviar el token', () => {
    const event = { }
    expect(() => helperValidToken(event)).toThrow('Acceso no autorizado')
  })
  test('validando token con carateres invalidos', () => {
    const token: string = '01l6Ak-phiUTDJ$A'
    const event = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    expect(() => helperValidToken(event)).toThrow('Acceso no autorizado')
  })
  test('validando token con más de 16 caracteres', () => {
    const token: string = '01l6AkhphiUTDJBA4as8'
    const event = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    expect(() => helperValidToken(event)).toThrow('Acceso no autorizado')
  })
  test('validando token con menos de 16 caracteres', () => {
    const token: string = '01l6Akhphi'
    const event = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    expect(() => helperValidToken(event)).toThrow('Acceso no autorizado')
  })
})
