import { useState } from 'react'
import { httpBatchLink } from '@trpc/client'
import { AppRouter } from '../routers/root'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'
import Constants from 'expo-constants'

function getBaseUrl() {
  if (process.env.API_URL) {
    return process.env.API_URL
  } else {
    const debuggerHost = Constants.expoConfig?.hostUri
    const localhost = debuggerHost?.split(':')[0]
    return `http://${localhost}:3000`
  }
}

export const api = createTRPCReact<AppRouter>()

export function TRPCProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
        }),
      ],
    })
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </api.Provider>
  )
}
