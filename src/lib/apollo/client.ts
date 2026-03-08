'use client'

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
    : 'http://localhost:3001/graphql',
  credentials: 'include'
})

const authLink = setContext((_, { headers }) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1]

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
})
