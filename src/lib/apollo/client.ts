'use client'

import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  HttpLink,
  InMemoryCache,
  Observable
} from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import { clearAuthCookies, refreshTokenAction } from '@/lib/auth/actions'

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  : 'http://localhost:3001/graphql'

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: 'include'
})

const getAccessToken = () => {
  if (typeof document === 'undefined') return undefined
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1]
}

let isRefreshing = false
let pendingRequests: ((token: string | undefined) => void)[] = []

const resolvePendingRequests = (token: string | undefined) => {
  for (const callback of pendingRequests) {
    callback(token)
  }
  pendingRequests = []
}

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    const unauthorizedError = error.errors.find(
      (err) => err.extensions?.code === 'UNAUTHORIZED' || err.message === 'Unauthorized'
    )

    if (unauthorizedError) {
      if (isRefreshing) {
        return new Observable((observer) => {
          pendingRequests.push((token) => {
            if (token) {
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  authorization: `Bearer ${token}`
                }
              })
            }
            forward(operation).subscribe(observer)
          })
        })
      }

      isRefreshing = true

      return new Observable((observer) => {
        refreshTokenAction()
          .then((result) => {
            isRefreshing = false
            if (result.success && result.accessToken) {
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  authorization: `Bearer ${result.accessToken}`
                }
              })
              resolvePendingRequests(result.accessToken)
              forward(operation).subscribe(observer)
            } else {
              resolvePendingRequests(undefined)
              clearAuthCookies()
              window.location.href = '/signin'
              observer.error(error)
            }
          })
          .catch(() => {
            isRefreshing = false
            resolvePendingRequests(undefined)
            clearAuthCookies()
            window.location.href = '/signin'
            observer.error(error)
          })
      })
    }
  }
})

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken()

  operation.setContext({
    headers: {
      ...operation.getContext().headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  })

  return forward(operation)
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } }
})
