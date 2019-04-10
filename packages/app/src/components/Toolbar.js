import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { isAdmin } from '../utils/auth'

const ToolbarContainer = styled.div`
  text-align: right;
  margin-right: 10px;

  & > * + * {
    margin-left: 10px;
  }
`

export default function Toolbar() {
  return (
    <ToolbarContainer>
      <Link to="/">Home</Link>
      {isAdmin() && <Link to="admin">Admin</Link>}
    </ToolbarContainer>
  )
}
