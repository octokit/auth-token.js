import { Token } from './types'

export async function auth (token: Token) {
  const tokenType = /^v\d+\./.test(token) ? 'installation' : 'oauth'

  return {
    type: 'token',
    headers: {
      authorization: `token ${token}`
    },
    token: token,
    tokenType,
    query: {}
  }
}
