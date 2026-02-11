import React, { useState, useEffect } from 'react'
import { Search, Menu, Bell, Settings, User, Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'
import SearchModal from '../ui/SearchModal'
import NotificationDropdown from '../ui/NotificationDropdown'
import UserDropdown from '../ui/UserDropdown'

const Header = ({ title, onMobileMenuClick }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    // Simulate search results - in real app, this would call an API
    const mockResults = [
      { id: 1, title: `Project proposal for ${query}`, type: 'proposal', href: '/proposals/1' },
      { id: 2, title: `${query} client project`, type: 'proposal', href: '/proposals/2' },
      { id: 3, title: `${query} - Web Development`, type: 'proposal', href: '/proposals/3' },
    ]
    
    setSearchResults(mockResults)
    setShowResults(true)

    // Navigate to proposals page with search query
    navigate(`/proposals?search=${encodeURIComponent(query)}`)
    setSearchQuery('')
    setShowResults(false)
  }

  // Debounced search for live results
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        // Show live search suggestions
        const suggestions = [
          { id: 1, title: `Search for "${searchQuery}" in proposals`, type: 'search' },
          { id: 2, title: `${searchQuery} - Recent`, type: 'recent' },
        ]
        setSearchResults(suggestions)
        setShowResults(true)
      }, 300)
      
      return () => clearTimeout(timeoutId)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchQuery])

  const handleResultClick = (result) => {
    if (result.href) {
      navigate(result.href)
    } else {
      handleSearch(searchQuery)
    }
    setShowResults(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          className={cn(
            "btn btn-ghost btn-sm lg:hidden",
            "focus-ring"
          )}
          onClick={onMobileMenuClick}
          aria-label="Open mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop breadcrumb/title */}
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search proposals
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className={cn(
                    "form-input pl-10 pr-4 py-2",
                    "placeholder:text-slate-500",
                    "focus-ring"
                  )}
                  placeholder="Search proposals, clients..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      handleSearch(searchQuery.trim())
                    }
                    if (e.key === 'Escape') {
                      setSearchQuery('')
                      setShowResults(false)
                    }
                  }}
                />
                {/* Search results dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full text-left p-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 focus:bg-slate-50 focus:outline-none"
                      >
                        <div className="flex items-center">
                          <Search className="h-4 w-4 text-slate-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">{result.title}</p>
                            <p className="text-xs text-slate-500 capitalize">{result.type}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                    {searchQuery && (
                      <div className="p-2 border-t border-slate-200 bg-slate-50">
                        <p className="text-xs text-slate-500 text-center">
                          Press Enter to search all proposals
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Click outside to close */}
                {showResults && (
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowResults(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Mobile search button */}
          <button
            type="button"
            className={cn(
              "btn btn-ghost btn-sm md:hidden",
              "focus-ring"
            )}
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Quick create button */}
          <Link
            to="/proposals/new"
            className={cn(
              "btn btn-primary btn-sm",
              "focus-ring hover-scale"
            )}
          >
            <Plus className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">New Proposal</span>
            <span className="sm:hidden">New</span>
          </Link>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Settings */}
          <Link
            to="/settings"
            className={cn(
              "btn btn-ghost btn-sm",
              "focus-ring hover-scale"
            )}
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Link>

          {/* User menu */}
          <UserDropdown />
        </div>
      </header>

      {/* Mobile Search Modal */}
      <SearchModal 
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
      />
    </>
  )
}

export default Header