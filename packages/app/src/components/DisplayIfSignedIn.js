export default function DisplayIfSignedIn({ authState, children }) {
  return authState === 'signedIn' && children
}
