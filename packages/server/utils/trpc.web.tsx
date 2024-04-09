import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { ssrPrepass } from '@trpc/next/ssrPrepass'
import { AppRouter } from '../routers/root'
import superjson from 'superjson'

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // In the browser, we return a relative URL
    return ''
  }
  // When rendering on the server, we return an absolute URL

  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: getBaseUrl() + '/api/trpc',
          transformer: superjson,
        }),
      ],
    }
  },
  ssr: true,
  ssrPrepass,
  transformer: superjson,
})
