import { handler } from '.'
import AWS from 'aws-sdk'
import https from 'https'

jest.mock('aws-sdk', () => ({
  SecretsManager: jest.fn(() => {
    return {
      getSecretValue(_, cb) {
        cb(null, {
          SecretString: JSON.stringify({
            ORION_CIRCLE_CI_API_USER_TOKEN: 'abc123456',
          }),
        })
      },
    }
  }),
}))
const mockOn = jest.fn()
const mockWrite = jest.fn()
const mockEnd = jest.fn()
jest.mock('https', () => ({
  request: jest.fn((_, cb) => {
    const res = {
      on(_, onCb) {
        onCb('foo')
      },
    }
    cb(res)
    const req = {
      on: mockOn,
      write: mockWrite,
      end: mockEnd,
    }
    return req
  }),
}))
AWS.SecretsManager.mockImplementation(() => ({ foo: 'bar' }))

describe('content generator lambda', () => {
  beforeEach(async () => {
    await handler()
  })
  it('gets the circle ci api key from amazon secure manager (ASM) and uses the value to call the circle API', () => {
    expect(https.request).toHaveBeenCalledWith(
      {
        headers: { 'Content-Length': 63, 'Content-Type': 'application/json' },
        hostname: 'circleci.com',
        method: 'POST',
        path:
          '/api/v2/project/github/nearform/orion/pipeline?circle-token=abc123456',
        port: 443,
      },
      expect.any(Function)
    )
  })

  it('writes the body into the request', () => {
    expect(mockWrite).toHaveBeenCalledWith(
      JSON.stringify({
        branch: 'staging',
        parameters: { regenerate_view_only: true }, // eslint-disable-line camelcase
      })
    )
  })

  it('sends the request', () => {
    expect(mockEnd).toHaveBeenCalled()
  })
})
