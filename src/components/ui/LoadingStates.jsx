import React from 'react'
import { cn } from '../../lib/utils'

// Skeleton Loading Components
export const SkeletonCard = ({ className = '' }) => (
  <div className={cn('card animate-pulse', className)}>
    <div className="card-header">
      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
    </div>
    <div className="card-content">
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 rounded w-full"></div>
        <div className="h-3 bg-slate-200 rounded w-4/5"></div>
        <div className="h-3 bg-slate-200 rounded w-2/3"></div>
      </div>
    </div>
  </div>
)

export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg animate-pulse">
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i} className="px-6 py-3">
              <div className="h-4 bg-slate-200 rounded w-20"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-slate-200 rounded w-16"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export const SkeletonList = ({ items = 5 }) => (
  <div className="space-y-4 animate-pulse">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
)

export const SkeletonChart = () => (
  <div className="chart-container animate-pulse">
    <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
    <div className="h-64 bg-slate-200 rounded"></div>
  </div>
)

// Spinner Components
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  return (
    <div className={cn('animate-spin', sizeClasses[size], className)}>
      <svg className="w-full h-full text-current" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

// Progress Indicators
export const ProgressBar = ({ value, max = 100, className = '', showLabel = false }) => {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-slate-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export const CircularProgress = ({ value, max = 100, size = 'md', className = '' }) => {
  const percentage = Math.min((value / max) * 100, 100)
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }
  
  const radius = 16
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-slate-200"
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-primary-600"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          fill="transparent"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-slate-700">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  )
}

// Loading Screen Component
export const LoadingScreen = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
    <div className="text-center">
      <Spinner size="xl" className="text-primary-600 mx-auto mb-4" />
      <p className="text-lg font-medium text-slate-700">{message}</p>
    </div>
  </div>
)

// Button Loading States
export const ButtonSpinner = ({ size = 'sm' }) => (
  <Spinner size={size} className="text-current mr-2" />
)

// Page Loading Component
export const PageLoading = ({ message = 'Loading...' }) => (
  <div className="flex items-center justify-center py-16">
    <div className="text-center">
      <Spinner size="lg" className="text-primary-600 mx-auto mb-4" />
      <p className="text-slate-600">{message}</p>
    </div>
  </div>
)

export default {
  SkeletonCard,
  SkeletonTable,
  SkeletonList,
  SkeletonChart,
  Spinner,
  ProgressBar,
  CircularProgress,
  LoadingScreen,
  ButtonSpinner,
  PageLoading
}