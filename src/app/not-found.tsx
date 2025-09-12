"use client"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-9xl font-extrabold text-green-500 tracking-widest">404</h1>
      <div className="bg-green-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Oops! The page you’re looking for doesn’t exist.
        </h2>
        <p className="mt-4 text-gray-500">
          It might have been removed, renamed, or didn’t exist in the first place.
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-block px-6 py-3 text-white bg-green-500 rounded-2xl shadow-md hover:bg-green-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
