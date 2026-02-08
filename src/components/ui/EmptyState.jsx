import React from 'react'
import { cn } from '../../lib/utils'
import { motion } from 'framer-motion'

const EmptyState = ({ 
  icon: Icon,
  title,
  description,
  action,
  illustration,
  className = '',
  size = 'default' 
}) => {
  const sizeClasses = {
    compact: 'py-8',
    default: 'py-12',
    large: 'py-16'
  }

  const iconSizeClasses = {
    compact: 'w-8 h-8',
    default: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('empty-state', sizeClasses[size], className)}
    >
      {/* Illustration or Icon */}
      {illustration ? (
        <div className="mb-6">
          {illustration}
        </div>
      ) : Icon && (
        <Icon className={cn(
          'empty-state-icon mx-auto mb-4 text-slate-400',
          iconSizeClasses[size]
        )} />
      )}

      {/* Content */}
      <div className="text-center max-w-sm mx-auto">
        {title && (
          <h3 className="empty-state-title">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="empty-state-description">
            {description}
          </p>
        )}

        {/* Action */}
        {action && (
          <div className="mt-6">
            {action}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Predefined Empty State Illustrations
const ProposalsIllustration = () => (
  <svg className="w-24 h-24 mx-auto text-slate-300" fill="currentColor" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="proposalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
    </defs>
    
    {/* Document stack */}
    <rect x="40" y="60" width="80" height="100" rx="4" fill="url(#proposalGradient)" opacity="0.6" transform="rotate(-5 80 110)" />
    <rect x="50" y="50" width="80" height="100" rx="4" fill="url(#proposalGradient)" opacity="0.8" transform="rotate(2 90 100)" />
    <rect x="60" y="40" width="80" height="100" rx="4" fill="url(#proposalGradient)" />
    
    {/* Lines on document */}
    <rect x="70" y="55" width="50" height="2" rx="1" fill="#94a3b8" />
    <rect x="70" y="65" width="60" height="2" rx="1" fill="#94a3b8" />
    <rect x="70" y="75" width="45" height="2" rx="1" fill="#94a3b8" />
    
    {/* Checkmark circle */}
    <circle cx="150" cy="65" r="15" fill="#22c55e" />
    <path d="m143 65 4 4 8-8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SearchIllustration = () => (
  <svg className="w-24 h-24 mx-auto text-slate-300" fill="none" viewBox="0 0 200 200">
    {/* Magnifying glass */}
    <circle cx="80" cy="80" r="30" stroke="currentColor" strokeWidth="4" />
    <path d="104 104l20 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    
    {/* Search waves */}
    <circle cx="80" cy="80" r="45" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeDasharray="5 5">
      <animate attributeName="r" values="45;55;45" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
)

const NoDataIllustration = () => (
  <svg className="w-24 h-24 mx-auto text-slate-300" fill="currentColor" viewBox="0 0 200 200">
    {/* Empty box */}
    <rect x="60" y="80" width="80" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 4" />
    <path d="M60 80 L100 50 L140 50 L180 80" stroke="currentColor" strokeWidth="3" fill="none" />
    <path d="M100 50 L100 110" stroke="currentColor" strokeWidth="3" strokeDasharray="8 4" />
    
    {/* Question mark */}
    <text x="100" y="120" textAnchor="middle" fontSize="24" fill="currentColor" opacity="0.5">?</text>
  </svg>
)

const ErrorIllustration = () => (
  <svg className="w-24 h-24 mx-auto text-slate-300" fill="none" viewBox="0 0 200 200">
    {/* Warning triangle */}
    <path d="M100 30 L170 150 L30 150 Z" stroke="currentColor" strokeWidth="3" fill="currentColor" opacity="0.1" />
    <circle cx="100" cy="110" r="3" fill="currentColor" />
    <path d="M100 80 L100 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

// Predefined Empty State Components
export const EmptyProposals = ({ onCreateProposal }) => (
  <EmptyState
    illustration={<ProposalsIllustration />}
    title="No proposals yet"
    description="Get started by creating your first proposal. You can track progress, manage client communications, and analyze performance all in one place."
    action={
      <button
        onClick={onCreateProposal}
        className="btn btn-primary btn-md hover-scale focus-ring"
      >
        Create Your First Proposal
      </button>
    }
  />
)

export const EmptySearchResults = ({ searchQuery, onClearSearch }) => (
  <EmptyState
    illustration={<SearchIllustration />}
    title={`No results for "${searchQuery}"`}
    description="Try adjusting your search terms or filters to find what you're looking for."
    action={
      <button
        onClick={onClearSearch}
        className="btn btn-outline btn-md focus-ring"
      >
        Clear Search
      </button>
    }
    size="compact"
  />
)

export const EmptyFilterResults = ({ onClearFilters }) => (
  <EmptyState
    illustration={<NoDataIllustration />}
    title="No proposals match your filters"
    description="Try adjusting your filters or search criteria to see more results."
    action={
      <button
        onClick={onClearFilters}
        className="btn btn-outline btn-md focus-ring"
      >
        Clear Filters
      </button>
    }
    size="compact"
  />
)

export const EmptyAnalytics = () => (
  <EmptyState
    illustration={<NoDataIllustration />}
    title="No data to display"
    description="Analytics will appear here once you have proposals and activity to track."
    size="compact"
  />
)

export const ErrorState = ({ title = "Something went wrong", description, onRetry }) => (
  <EmptyState
    illustration={<ErrorIllustration />}
    title={title}
    description={description || "We encountered an error while loading this content. Please try again."}
    action={onRetry && (
      <button
        onClick={onRetry}
        className="btn btn-primary btn-md focus-ring"
      >
        Try Again
      </button>
    )}
  />
)

// Generic illustration for custom empty states
export const GenericIllustration = ({ className = "" }) => (
  <div className={cn("w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center", className)}>
    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
      <div className="w-6 h-6 rounded-full bg-slate-300"></div>
    </div>
  </div>
)

export default EmptyState