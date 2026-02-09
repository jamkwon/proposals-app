import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Send,
  Archive,
  CheckSquare,
  Square,
  X,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Calendar,
  Wand2
} from 'lucide-react'
import { cn } from '../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { mockProposals } from '../data/mockData'
import { formatCurrency, formatDate, getStatusColor, sortBy, filterBy } from '../lib/utils'
import { SkeletonTable } from '../components/ui/LoadingStates'
import { EmptyProposals, EmptySearchResults, EmptyFilterResults } from '../components/ui/EmptyState'
import { CircularProgress } from '../components/ui/LoadingStates'

const Proposals = () => {
  const [proposals, setProposals] = useState(mockProposals)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProposals, setSelectedProposals] = useState(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('table') // 'table' | 'grid'
  const [sortConfig, setSortConfig] = useState({ key: 'updated_at', direction: 'desc' })
  
  // Filter states - P2 improvement #5: Search & Filter Improvements
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    type: 'all',
    client: 'all',
    dateRange: 'all'
  })

  // Filtered and sorted proposals
  const filteredProposals = useMemo(() => {
    let filtered = proposals

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(proposal => 
        proposal.title.toLowerCase().includes(query) ||
        proposal.description.toLowerCase().includes(query) ||
        proposal.client.name.toLowerCase().includes(query) ||
        proposal.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply other filters
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== 'all' && value) {
        acc[key] = value
      }
      return acc
    }, {})

    if (Object.keys(activeFilters).length > 0) {
      filtered = filterBy(filtered, activeFilters)
    }

    // Apply sorting
    return sortBy(filtered, sortConfig.key, sortConfig.direction)
  }, [proposals, searchQuery, filters, sortConfig])

  // Bulk actions - P3 improvement #14: Bulk Actions
  const handleSelectAll = () => {
    if (selectedProposals.size === filteredProposals.length) {
      setSelectedProposals(new Set())
    } else {
      setSelectedProposals(new Set(filteredProposals.map(p => p.id)))
    }
  }

  const handleSelectProposal = (id) => {
    const newSelected = new Set(selectedProposals)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedProposals(newSelected)
  }

  const handleBulkAction = async (action) => {
    const selectedIds = Array.from(selectedProposals)
    console.log('Bulk action:', action, 'for proposals:', selectedIds)
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      switch (action) {
        case 'archive':
          setProposals(prev => prev.map(p => 
            selectedIds.includes(p.id) 
              ? { ...p, status: 'archived' }
              : p
          ))
          console.log(`Archived ${selectedIds.length} proposals`)
          break
          
        case 'delete':
          if (window.confirm(`Are you sure you want to delete ${selectedIds.length} proposals? This cannot be undone.`)) {
            setProposals(prev => prev.filter(p => !selectedIds.includes(p.id)))
            console.log(`Deleted ${selectedIds.length} proposals`)
          }
          break
          
        case 'duplicate':
          const selectedProposalsData = proposals.filter(p => selectedIds.includes(p.id))
          const duplicatedProposals = selectedProposalsData.map(p => ({
            ...p,
            id: Date.now() + Math.random(), // Generate new ID
            title: `${p.title} (Copy)`,
            status: 'draft',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }))
          setProposals(prev => [...duplicatedProposals, ...prev])
          console.log(`Duplicated ${selectedIds.length} proposals`)
          break
          
        case 'export':
          // Simulate export
          const exportData = proposals.filter(p => selectedIds.includes(p.id))
          const dataStr = JSON.stringify(exportData, null, 2)
          const dataBlob = new Blob([dataStr], { type: 'application/json' })
          const url = URL.createObjectURL(dataBlob)
          const link = document.createElement('a')
          link.href = url
          link.download = `proposals_export_${new Date().toISOString().split('T')[0]}.json`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          console.log(`Exported ${selectedIds.length} proposals`)
          break
          
        case 'send':
          // Simulate sending proposals
          setProposals(prev => prev.map(p => 
            selectedIds.includes(p.id) 
              ? { ...p, status: 'sent', sent_at: new Date().toISOString() }
              : p
          ))
          console.log(`Sent ${selectedIds.length} proposals`)
          break
          
        default:
          console.log(`Unknown action: ${action}`)
      }
    } catch (error) {
      console.error('Error performing bulk action:', error)
      alert('An error occurred while performing the action. Please try again.')
    } finally {
      setLoading(false)
      setSelectedProposals(new Set())
    }
  }

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const clearFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      type: 'all',
      client: 'all',
      dateRange: 'all'
    })
    setSearchQuery('')
  }

  // Get unique filter options
  const filterOptions = {
    statuses: [...new Set(proposals.map(p => p.status))],
    priorities: [...new Set(proposals.map(p => p.priority))],
    types: [...new Set(proposals.map(p => p.type))],
    clients: [...new Set(proposals.map(p => p.client.name))],
  }

  if (loading) {
    return <SkeletonTable rows={8} cols={6} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Proposals</h1>
          <p className="text-slate-600 mt-1">
            Manage and track your business proposals
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/proposals/new"
            className="btn btn-outline btn-md hover-scale focus-ring"
          >
            <Plus className="h-4 w-4 mr-2" />
            Classic Form
          </Link>
          <Link
            to="/proposals/builder"
            className="relative btn btn-primary btn-md hover-scale focus-ring bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Smart Builder
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          </Link>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-4">
        <div className="flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search proposals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-10 pr-4"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "btn btn-outline btn-sm",
                showFilters && "bg-slate-100"
              )}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>

            <div className="flex items-center border border-slate-200 rounded-md">
              <button
                onClick={() => setViewMode('table')}
                className={cn(
                  "p-2 text-sm",
                  viewMode === 'table' ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 text-sm",
                  viewMode === 'grid' ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4 border-t border-slate-200"
            >
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="form-input text-sm"
              >
                <option value="all">All Status</option>
                {filterOptions.statuses.map(status => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>

              <select
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                className="form-input text-sm"
              >
                <option value="all">All Priority</option>
                {filterOptions.priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>

              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="form-input text-sm"
              >
                <option value="all">All Types</option>
                {filterOptions.types.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={filters.client}
                onChange={(e) => setFilters(prev => ({ ...prev, client: e.target.value }))}
                className="form-input text-sm"
              >
                <option value="all">All Clients</option>
                {filterOptions.clients.map(client => (
                  <option key={client} value={client}>
                    {client}
                  </option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="btn btn-outline btn-sm"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bulk Actions Bar - P3 improvement #14 */}
      <AnimatePresence>
        {selectedProposals.size > 0 && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-primary-50 border border-primary-200 p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckSquare className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-primary-900 font-medium">
                  {selectedProposals.size} proposal{selectedProposals.size > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBulkAction('send')}
                  className="btn btn-sm btn-primary"
                  disabled={loading}
                >
                  <Send className="h-4 w-4 mr-1" />
                  Send
                </button>
                <button
                  onClick={() => handleBulkAction('duplicate')}
                  className="btn btn-sm btn-outline"
                  disabled={loading}
                >
                  <Wand2 className="h-4 w-4 mr-1" />
                  Duplicate
                </button>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="btn btn-sm btn-outline"
                  disabled={loading}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </button>
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="btn btn-sm btn-outline"
                  disabled={loading}
                >
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="btn btn-sm btn-outline text-red-600 border-red-200 hover:bg-red-50"
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
                <div className="border-l border-slate-300 h-6"></div>
                <button
                  onClick={() => setSelectedProposals(new Set())}
                  className="btn btn-sm btn-ghost"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          Showing {filteredProposals.length} of {proposals.length} proposals
        </span>
        <span>
          Total value: {formatCurrency(filteredProposals.reduce((sum, p) => sum + p.amount, 0))}
        </span>
      </div>

      {/* Content */}
      {filteredProposals.length === 0 ? (
        searchQuery ? (
          <EmptySearchResults 
            searchQuery={searchQuery} 
            onClearSearch={() => setSearchQuery('')} 
          />
        ) : Object.values(filters).some(f => f !== 'all') ? (
          <EmptyFilterResults onClearFilters={clearFilters} />
        ) : (
          <EmptyProposals onCreateProposal={() => console.log('Create proposal')} />
        )
      ) : viewMode === 'table' ? (
        <ProposalsTable 
          proposals={filteredProposals}
          selectedProposals={selectedProposals}
          onSelectAll={handleSelectAll}
          onSelectProposal={handleSelectProposal}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      ) : (
        <ProposalsGrid 
          proposals={filteredProposals}
          selectedProposals={selectedProposals}
          onSelectProposal={handleSelectProposal}
        />
      )}
    </div>
  )
}

// Table View Component
const ProposalsTable = ({ 
  proposals, 
  selectedProposals, 
  onSelectAll, 
  onSelectProposal, 
  onSort, 
  sortConfig 
}) => {
  const SortButton = ({ column, children }) => (
    <button
      onClick={() => onSort(column)}
      className="flex items-center space-x-1 text-left font-medium text-slate-700 hover:text-slate-900 focus-ring"
    >
      <span>{children}</span>
      {sortConfig.key === column && (
        sortConfig.direction === 'asc' ? 
          <SortAsc className="h-4 w-4" /> : 
          <SortDesc className="h-4 w-4" />
      )}
    </button>
  )

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={onSelectAll}
                  className="text-slate-400 hover:text-slate-600 focus-ring"
                >
                  {selectedProposals.size === proposals.length ? (
                    <CheckSquare className="h-5 w-5" />
                  ) : (
                    <Square className="h-5 w-5" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <SortButton column="title">Proposal</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <SortButton column="client.name">Client</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <SortButton column="status">Status</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <SortButton column="amount">Value</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <SortButton column="deadline">Deadline</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {proposals.map((proposal, index) => (
              <motion.tr
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <button
                    onClick={() => onSelectProposal(proposal.id)}
                    className="text-slate-400 hover:text-slate-600 focus-ring"
                  >
                    {selectedProposals.has(proposal.id) ? (
                      <CheckSquare className="h-5 w-5" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <Link
                        to={`/proposals/${proposal.id}`}
                        className="text-sm font-medium text-slate-900 hover:text-primary-700 focus-ring"
                      >
                        {proposal.title}
                      </Link>
                      <p className="text-sm text-slate-500">{proposal.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">{proposal.client.name}</div>
                  <div className="text-sm text-slate-500">{proposal.client.company}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn('status-badge', getStatusColor(proposal.status))}>
                    {proposal.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  {formatCurrency(proposal.amount)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  {proposal.deadline ? formatDate(proposal.deadline) : 'No deadline'}
                </td>
                <td className="px-6 py-4">
                  <CircularProgress 
                    value={proposal.milestones?.reduce((acc, m) => acc + m.completion, 0) / (proposal.milestones?.length || 1)} 
                    size="sm" 
                  />
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <ProposalActions proposal={proposal} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Grid View Component
const ProposalsGrid = ({ proposals, selectedProposals, onSelectProposal }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {proposals.map((proposal, index) => (
      <motion.div
        key={proposal.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="card hover-lift group cursor-pointer relative"
      >
        <button
          onClick={() => onSelectProposal(proposal.id)}
          className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 focus-ring z-10"
        >
          {selectedProposals.has(proposal.id) ? (
            <CheckSquare className="h-5 w-5" />
          ) : (
            <Square className="h-5 w-5" />
          )}
        </button>

        <div className="card-content p-6">
          <div className="flex items-start justify-between mb-4">
            <span className={cn('status-badge', getStatusColor(proposal.status))}>
              {proposal.status.replace('_', ' ')}
            </span>
            <ProposalActions proposal={proposal} />
          </div>

          <Link
            to={`/proposals/${proposal.id}`}
            className="block focus-ring"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors">
              {proposal.title}
            </h3>
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">
              {proposal.description}
            </p>
          </Link>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Client:</span>
              <span className="font-medium text-slate-900">{proposal.client.name}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Value:</span>
              <span className="font-medium text-slate-900">{formatCurrency(proposal.amount)}</span>
            </div>

            {proposal.deadline && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Deadline:</span>
                <span className="font-medium text-slate-900">{formatDate(proposal.deadline)}</span>
              </div>
            )}

            <div className="pt-2">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-500">Progress:</span>
                <span className="font-medium text-slate-900">
                  {Math.round(proposal.milestones?.reduce((acc, m) => acc + m.completion, 0) / (proposal.milestones?.length || 1))}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${proposal.milestones?.reduce((acc, m) => acc + m.completion, 0) / (proposal.milestones?.length || 1)}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
)

// Actions Dropdown Component
const ProposalActions = ({ proposal }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(!isOpen)
        }}
        className="btn btn-ghost btn-sm focus-ring"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1">
              <Link
                to={`/proposals/${proposal.id}`}
                className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Eye className="h-4 w-4 mr-3" />
                View Details
              </Link>
              <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <Edit className="h-4 w-4 mr-3" />
                Edit
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <Send className="h-4 w-4 mr-3" />
                Send
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <Download className="h-4 w-4 mr-3" />
                Download PDF
              </button>
              <div className="border-t border-slate-200 my-1"></div>
              <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-3" />
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Proposals