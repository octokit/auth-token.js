import { auth } from './auth'
import { Token } from './types'

export function createTokenAuth (token: Token) {
  return auth.bind(null, token)
}

