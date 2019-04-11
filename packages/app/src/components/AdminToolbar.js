import React from 'react'
import styled from 'styled-components'

import { isAdmin } from '../utils/auth'
import NavLink from './NavLink'

const ToolbarContainer = styled.div`
  text-align: right;
  margin-right: 10px;

  & > * + * {
    margin-left: 10px;
  }
`

export default function AdminToolbar() {
  return (
    <ToolbarContainer>
      <NavLink to="pending-users">Pending users</NavLink>
      <NavLink to="groups">Groups</NavLink>
    </ToolbarContainer>
  )
}
