import Amplify from 'aws-amplify'
import awsConfig from './aws-exports'

Amplify.configure(awsConfig)

export { Auth, Storage } from 'aws-amplify'
