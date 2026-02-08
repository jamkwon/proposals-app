import React, { useState, useEffect, useRef } from 'react'
import { Search, FileText, User, Calendar, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { mockProposals, mockClients } from '../../data/mockData'

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [activeSection, setActiveSection] = useState(0)
  const [activeItem, setActiveItem] = useState(0)
  const inputRef = useRef(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          navigateResults('down')
          break
        case 'ArrowUp':
          e.preventDefault()
          navigateResults('up')
          break
        case 'Enter':
          e.preventDefault()
          selectActiveResult()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, activeSection, activeItem])

  // Perform search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchResults = performSearch(query)
    setResults(searchResults)
    setActiveSection(0)
    setActiveItem(0)
  }, [query])

  const performSearch = (searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase()
    
    // Search proposals
    const proposals = mockProposals.filter(proposal =>
      proposal.title.toLowerCase().includes(lowerQuery) ||
      proposal.description.toLowerCase().includes(lowerQuery) ||
      proposal.client.name.toLowerCase().includes(lowerQuery) ||
      proposal.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    ).slice(0, 5)

    // Search clients
    const clients = mockClients.filter(client =>
      client.name.toLowerCase().includes(lowerQuery) ||
      client.company.toLowerCase().includes(lowerQuery) ||
      client.email.toLowerCase().includes(lowerQuery)
    ).slice(0, 3)

    // Create sections
    const sections = []
    
    if (proposals.length > 0) {
      sections.push({
        title: 'Proposals',
        items: proposals.map(p => ({
          id: p.id,
          type: 'proposal',
          title: p.title,
          subtitle: p.client.name,
          icon: FileText,
          href: `/proposals/${p.id}`
        }))
      })
    }

    if (clients.length > 0) {
      sections.push({
        title: 'Clients',
        items: clients.map(c => ({
          id: c.id,
          type: 'client',
          title: c.name,
          subtitle: c.company,
          icon: User,
          href: `/clients/${c.id}`
        }))
      })
    }

    return sections
  }

  const navigateResults = (direction) => {
    if (results.length === 0) return

    const totalItems = results.reduce((sum, section) => sum + section.items.length, 0)
    
    if (direction === 'down') {
      const currentGlobalIndex = getCurrentGlobalIndex()
      const newGlobalIndex = (currentGlobalIndex + 1) % totalItems
      setActivePositionFromGlobalIndex(newGlobalIndex)
    } else {
      const currentGlobalIndex = getCurrentGlobalIndex()
      const newGlobalIndex = currentGlobalIndex === 0 ? totalItems - 1 : currentGlobalIndex - 1
      setActivePositionFromGlobalIndex(newGlobalIndex)
    }
  }

  const getCurrentGlobalIndex = () => {
    let globalIndex = 0
    for (let i = 0; i < activeSection; i++) {
      globalIndex += results[i].items.length
    }
    return globalIndex + activeItem
  }

  const setActivePositionFromGlobalIndex = (globalIndex) => {
    let currentIndex = 0
    for (let sectionIndex = 0; sectionIndex < results.length; sectionIndex++) {
      const section = results[sectionIndex]
      if (currentIndex + section.items.length > globalIndex) {
        setActiveSection(sectionIndex)
        setActiveItem(globalIndex - currentIndex)
        return
      }
      currentIndex += section.items.length
    }
  }

  const selectActiveResult = () => {
    if (results.length === 0) return

    const activeResult = results[activeSection]?.items[activeItem]
    if (activeResult) {
      // Navigate to the selected item
      console.log('Navigate to:', activeResult.href)
      onClose()
    }
  }

  const handleResultClick = (item) => {
    console.log('Navigate to:', item.href)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-hidden"
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-slate-600 bg-opacity-40"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="fixed inset-x-4 top-20 mx-auto max-w-xl">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-slate-200">
              <Search className="h-5 w-5 text-slate-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search proposals, clients..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-slate-900 placeholder-slate-500"
              />
              <button
                onClick={onClose}
                className="ml-3 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-80 overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  {query.trim() ? (
                    <div>
                      <Search className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-slate-500 text-sm">No results found for "{query}"</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-500 text-sm">Type to search proposals and clients...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-2">
                  {results.map((section, sectionIndex) => (
                    <div key={section.title}>
                      <h3 className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide bg-slate-50">
                        {section.title}
                      </h3>
                      {section.items.map((item, itemIndex) => (
                        <button
                          key={item.id}
                          onClick={() => handleResultClick(item)}
                          className={cn(
                            "w-full flex items-center px-4 py-3 text-left hover:bg-slate-50 focus:bg-slate-50 focus:outline-none transition-colors",
                            activeSection === sectionIndex && activeItem === itemIndex && "bg-primary-50"
                          )}
                        >
                          <item.icon className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {item.title}
                            </p>
                            <p className="text-sm text-slate-500 truncate">
                              {item.subtitle}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {results.length > 0 && (
              <div className="px-4 py-2 border-t border-slate-200 bg-slate-50">
                <p className="text-xs text-slate-500">
                  Use ↑↓ to navigate, ↵ to select, ESC to close
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SearchModal