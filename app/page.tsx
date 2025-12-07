'use client'

import { Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <Authenticated>
          <div className="flex flex-col items-center gap-6">
            <UserButton />
            <Content />
          </div>
        </Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Welcome to Your App
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Sign in to access your personalized content and features.
            </p>
            <SignInButton mode="modal">
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-[#5a3ce6] transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </Unauthenticated>
      </main>
    </div>
  )
}

function Content() {
  const messages = useQuery(api.messages.getForCurrentUser)

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Authenticated Dashboard
      </h1>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 max-w-md">
        {messages === undefined ? (
          <p className="text-zinc-600 dark:text-zinc-400">Loading messages...</p>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            Authenticated content: {messages.length} message(s)
          </p>
        )}
      </div>
    </div>
  )
}
