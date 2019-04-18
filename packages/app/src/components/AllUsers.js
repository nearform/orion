import React from 'react'
import Users from './Users'

const getUsers = `query getUsers {
  user {
    id
    name
    pending
  }
}`

export default function AllUsers() {
  return <Users query={getUsers} pageTitle="All Users" />
}

