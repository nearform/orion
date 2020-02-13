require('dotenv').config()

const keyRegExp = /^PERMISSIONS_TESTS_/

const env = Object.keys(process.env)
  .filter(envKey => keyRegExp.test(envKey))
  .reduce(
    (acc, envKey) => ({
      ...acc,
      [envKey.replace(keyRegExp, '')]: process.env[envKey],
    }),
    {}
  )

module.exports = env
