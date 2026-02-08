import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import MobileNavigation from './MobileNavigation'
import { cn } from '../../lib/utils'

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Get page title based on route
  const getPageTitle = () => {
    const path = location.pathname
    switch (path) {
      case '/': return 'Dashboard'
      case '/proposals': return 'Proposals'
      case '/proposals/new': return 'Create Proposal'
      case '/analytics': return 'Analytics'
      case '/settings': return 'Settings'
      default:
        if (path.includes('/proposals/')) return 'Proposal Details'
        return 'FIGMINTS Proposals'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-nav-overlay lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Navigation Panel */}
      <MobileNavigation 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-72">
        <Header 
          title={getPageTitle()}
          onMobileMenuClick={() => setMobileMenuOpen(true)}
        />

        {/* Page Content */}
        <main className="py-6">
          <div className={cn(
            "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            "animate-fade-in"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout