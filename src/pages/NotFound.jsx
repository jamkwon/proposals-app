import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="text-6xl font-bold text-slate-300 mb-4">404</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
          <p className="text-slate-600">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or the URL was mistyped.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="btn btn-primary btn-md"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
          <Link
            to="/proposals"
            className="btn btn-outline btn-md"
          >
            <Search className="h-4 w-4 mr-2" />
            Browse Proposals
          </Link>
        </div>

        <div className="mt-8 text-sm text-slate-500">
          <p>If you think this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound