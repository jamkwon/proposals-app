import React, { useState, useRef, useEffect } from 'react'
import { Bell, Check, X, Clock, AlertTriangle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDate, getRelativeTime } from '../../lib/utils'

const mockNotifications = [
  {
    id: '1',
    type: 'proposal_approved',
    title: 'Proposal Approved',
    message: 'Your proposal "E-commerce Website Development" has been approved by Global Marketing Inc.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    priority: 'high',
    actionUrl: '/proposals/2'
  },
  {
    id: '2',
    type: 'deadline_approaching',
    title: 'Deadline Approaching',
    message: 'Proposal "Complete Brand Redesign Project" is due in 2 days.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    priority: 'medium',
    actionUrl: '/proposals/1'
  },
  {
    id: '3',
    type: 'comment_added',
    title: 'New Comment',
    message: 'TechCorp Solutions added a comment to your proposal.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    priority: 'low',
    actionUrl: '/proposals/1'
  },
  {
    id: '4',
    type: 'payment_received',
    title: 'Payment Received',
    message: 'Payment of $15,000 received for Enterprise Software Consultation.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    priority: 'high',
    actionUrl: '/proposals/4'
  },
]

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const dropdownRef = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'proposal_approved':
        return <Check className="h-4 w-4 text-green-600" />
      case 'deadline_approaching':
        return <Clock className="h-4 w-4 text-amber-600" />
      case 'comment_added':
        return <Bell className="h-4 w-4 text-blue-600" />
      case 'payment_received':
        return <Check className="h-4 w-4 text-green-600" />
      default:
        return <Bell className="h-4 w-4 text-slate-600" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500'
      case 'medium':
        return 'border-l-amber-500'
      case 'low':
        return 'border-l-blue-500'
      default:
        return 'border-l-slate-300'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "btn btn-ghost btn-sm relative",
          "focus-ring hover-scale"
        )}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary-600 hover:text-primary-700 focus:outline-none focus:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center">
                  <Bell className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={cn(
                        "p-3 rounded-md border-l-4 cursor-pointer group relative",
                        "transition-colors duration-200",
                        notification.read 
                          ? "bg-white hover:bg-slate-50" 
                          : "bg-blue-50 hover:bg-blue-100",
                        getPriorityColor(notification.priority)
                      )}
                      onClick={() => {
                        markAsRead(notification.id)
                        // Navigate to action URL
                        console.log('Navigate to:', notification.actionUrl)
                        setIsOpen(false)
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={cn(
                                "text-sm font-medium truncate",
                                notification.read ? "text-slate-900" : "text-slate-900"
                              )}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {getRelativeTime(notification.timestamp)}
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-slate-400 hover:text-slate-600 focus:outline-none"
                                aria-label="Remove notification"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    // Navigate to notifications page
                    console.log('Navigate to: /notifications')
                  }}
                  className="w-full text-center text-sm text-primary-600 hover:text-primary-700 focus:outline-none focus:underline"
                >
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotificationDropdown