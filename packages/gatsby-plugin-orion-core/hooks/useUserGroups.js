import { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { AuthContext } from 'components'

export default function useUserGroups() {
  const { setUserGroups } = useContext(AuthContext)

  const groups = useStaticQuery(
    graphql`
      query {
        orion {
          group {
            id
            type
            name
          }
        }
      }
    `
  )

  setUserGroups(groups)
}