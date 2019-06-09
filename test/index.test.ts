import { createTokenAuth } from '../src/index'

test('README example', async () => {
  const auth = createTokenAuth('1234567890abcdef1234567890abcdef12345678')
  const authentication = await auth();

  expect(authentication).toEqual({
    type: 'token',
    token: '1234567890abcdef1234567890abcdef12345678',
    tokenType: 'oauth',
    headers: {
      authorization: 'token 1234567890abcdef1234567890abcdef12345678'
    },
    query: {}
  })
})

test('installation token', async () => {
  const auth = createTokenAuth('v1.1234567890abcdef1234567890abcdef12345678')
  const authentication = await auth();

  expect(authentication).toEqual({
    type: 'token',
    token: 'v1.1234567890abcdef1234567890abcdef12345678',
    tokenType: 'installation',
    headers: {
      authorization: 'token v1.1234567890abcdef1234567890abcdef12345678'
    },
    query: {}
  })
})

test('invalid token', async () => {
  const auth = createTokenAuth('whatislove')
  const authentication = await auth();

  expect(authentication).toEqual({
    type: 'token',
    token: 'whatislove',
    tokenType: 'oauth',
    headers: {
      authorization: 'token whatislove'
    },
    query: {}
  })
})
