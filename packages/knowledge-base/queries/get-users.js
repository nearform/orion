module.exports = `
{
  raw_salmon {
    user {
      id
      first_name
      last_name
      email
      signupRequest
      avatar
      biography
      linkedin
      website
      twitter
      title
      consent_contact
      consent_directory
      user_roles {
        role {
          name
        }
      }
    }
  }
}
`
