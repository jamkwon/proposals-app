import React, { useState, useRef, useEffect } from 'react'
import { User, Settings, LogOut, HelpCircle, Moon, Sun, Monitor } from 'lucide-react'
import { cn } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const mockUser = {
  name: 'John Doe',
  email: 'john@figmints.net',
  role: 'Project Manager',
  avatar: null,
  initials: 'JD'
}

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('system')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system'
    setTheme(savedTheme)
    
    const applyTheme = (themeName) => {
      const root = document.documentElement
      if (themeName === 'dark') {
        root.classList.add('dark')
      } else if (themeName === 'light') {
        root.classList.remove('dark')
      } else {
        // System theme
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (systemDark) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
    }

    applyTheme(savedTheme)

    // Listen for system theme changes when using system theme
    if (savedTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => applyTheme('system')
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    
    // Apply theme to document
    const root = document.documentElement
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else if (newTheme === 'light') {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      // System theme
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      localStorage.setItem('theme', 'system')
    }
  }

  const menuItems = [
    {
      label: 'Profile',
      icon: User,
      action: () => console.log('Navigate to profile'),
    },
    {
      label: 'Settings',
      icon: Settings,
      action: () => console.log('Navigate to settings'),
    },
    {
      label: 'Help & Support',
      icon: HelpCircle,
      action: () => console.log('Navigate to help'),
    },
  ]

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 rounded-full p-1 text-sm",
          "focus-ring hover-scale transition-transform duration-200",
          "hover:bg-slate-100"
        )}
        aria-label="User menu"
      >
        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
          {mockUser.avatar ? (
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <span className="text-white font-medium text-sm">
              {mockUser.initials}
            </span>
          )}
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            {/* User Info Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center">
                  {mockUser.avatar ? (
                    <img
                      src={mockUser.avatar}
                      alt={mockUser.name}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <span className="text-white font-medium text-lg">
                      {mockUser.initials}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {mockUser.name}
                  </p>
                  <p className="text-sm text-slate-500 truncate">
                    {mockUser.email}
                  </p>
                  <p className="text-xs text-slate-400">
                    {mockUser.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action()
                    setIsOpen(false)
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none transition-colors duration-200"
                >
                  <item.icon className="h-4 w-4 mr-3 text-slate-400" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Theme Selector */}
            <div className="border-t border-slate-200">
              <div className="p-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                  Theme
                </p>
                <div className="space-y-1">
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleThemeChange(option.value)}
                      className={cn(
                        "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-200",
                        theme === option.value
                          ? "bg-primary-50 text-primary-700"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      <option.icon className={cn(
                        "h-4 w-4 mr-3",
                        theme === option.value ? "text-primary-600" : "text-slate-400"
                      )} />
                      {option.label}
                      {theme === option.value && (
                        <div className="ml-auto h-2 w-2 bg-primary-600 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="border-t border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </div>
                <div className="text-xs text-slate-400">
                  Last active: now
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="border-t border-slate-200">
              <button
                onClick={() => {
                  console.log('Logout')
                  setIsOpen(false)
                }}
                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:outline-none transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserDropdown