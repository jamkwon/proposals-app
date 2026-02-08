import clsx from 'clsx'

export function cn(...classes) {
  return clsx(classes)
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date, format = 'short') {
  if (!date) return 'N/A'
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const formats = {
    short: { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    },
    long: { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    },
    time: { 
      hour: '2-digit', 
      minute: '2-digit' 
    },
    datetime: { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    },
  }

  return new Intl.DateTimeFormat('en-US', formats[format] || formats.short).format(dateObj)
}

export function getRelativeTime(date) {
  if (!date) return 'N/A'
  
  const now = new Date()
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const diffInDays = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24))

  if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} days ago`
  } else if (diffInDays === 0) {
    return 'Today'
  } else if (diffInDays === 1) {
    return 'Tomorrow'
  } else if (diffInDays <= 7) {
    return `In ${diffInDays} days`
  } else {
    return formatDate(targetDate)
  }
}

export function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getStatusColor(status) {
  const statusColors = {
    draft: 'status-draft',
    pending: 'status-pending',
    under_review: 'status-pending',
    approved: 'status-approved',
    rejected: 'status-rejected',
    sent: 'status-pending',
    won: 'status-approved',
    lost: 'status-rejected',
  }
  return statusColors[status] || 'status-draft'
}

export function calculateProgress(current, total) {
  if (!total || total === 0) return 0
  return Math.min(Math.round((current / total) * 100), 100)
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function sanitizeFileName(fileName) {
  return fileName.replace(/[^a-z0-9.-]/gi, '_').toLowerCase()
}

export function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function sortBy(array, key, direction = 'asc') {
  return [...array].sort((a, b) => {
    let aVal = key.split('.').reduce((obj, prop) => obj?.[prop], a)
    let bVal = key.split('.').reduce((obj, prop) => obj?.[prop], b)
    
    // Handle different data types
    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()
    
    if (direction === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
    }
  })
}

export function filterBy(array, filters) {
  return array.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value || value === 'all') return true
      
      const itemValue = key.split('.').reduce((obj, prop) => obj?.[prop], item)
      
      if (typeof value === 'string') {
        return itemValue?.toString().toLowerCase().includes(value.toLowerCase())
      }
      
      return itemValue === value
    })
  })
}