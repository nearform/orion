import React from 'react'
import { Redirect } from '@reach/router'

export default function Homepage() {
  return <Redirect to="/assess" noThrow />
}
