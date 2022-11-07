import { genereteToken } from './genereteToken'

describe('pruebas de creación de token de 16 caracteres', () => {
  test('creando token sin parametros', () => {
    expect(genereteToken()).toHaveLength(16)
  })
  test('creando token con parametro menor a 16', () => {
    expect(genereteToken(13)).toBe(false)
  })
  test('creando token con parametro mayor a 16', () => {
    expect(genereteToken(13)).toBe(false)
  })
})
