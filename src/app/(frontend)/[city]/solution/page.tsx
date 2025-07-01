import Link from 'next/link'

export default function page() {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-2">
      <h1 className="text-teal-500 font-semibold text-3xl">Oops, Page not found</h1>
      <Link href={'/'} className="inline-flex items-center">
        Back to Main Page
      </Link>
    </div>
  )
}
