/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @link https://trpc.io/docs/v11/router
 * @link https://trpc.io/docs/v11/procedures
 */
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.create({ transformer: superjson })

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure

export const router = t.router
export const createCallerFactory = t.createCallerFactory
