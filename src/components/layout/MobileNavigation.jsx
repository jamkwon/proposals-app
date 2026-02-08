import React from 'react'
import { NavLink } from 'react-router-dom'
import { X, LayoutDashboard, FileText, BarChart3, Settings, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Proposals', href: '/proposals', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const MobileNavigation = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="mobile-nav-panel lg:hidden"
        >
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-slate-200">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="ml-2 text-xl font-bold text-slate-900">FIGMINTS</span>
            </div>
            <button
              type="button"
              className={cn(
                "btn btn-ghost btn-sm",
                "focus-ring"
              )}
              onClick={onClose}
              aria-label="Close mobile menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-6">
            <div className="space-y-8">
              {/* Quick Action */}
              <div>
                <NavLink
                  to="/proposals/new"
                  onClick={onClose}
                  className={cn(
                    "btn btn-primary w-full justify-center",
                    "focus-ring hover-scale"
                  )}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Proposal
                </NavLink>
              </div>

              {/* Main Navigation */}
              <div>
                <h3 className="text-xs font-semibold leading-6 text-slate-400 uppercase tracking-wide mb-3">
                  Navigation
                </h3>
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "group flex gap-x-3 rounded-md p-3 text-base font-medium transition-colors duration-200",
                          "focus-ring hover-lift",
                          isActive
                            ? "bg-primary-50 text-primary-700"
                            : "text-slate-700 hover:text-primary-700 hover:bg-slate-50"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={cn(
                              "h-6 w-6 shrink-0 transition-colors duration-200",
                              isActive ? "text-primary-600" : "text-slate-400 group-hover:text-primary-600"
                            )}
                          />
                          {item.name}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Mobile-specific features */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-xs font-semibold leading-6 text-slate-400 uppercase tracking-wide mb-3">
                  Quick Access
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors">
                    <FileText className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">Drafts</span>
                  </button>
                  <button className="flex flex-col items-center p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors">
                    <BarChart3 className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">Reports</span>
                  </button>
                </div>
              </div>

              {/* User info */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">JD</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">John Doe</p>
                    <p className="text-xs text-slate-500">john@figmints.net</p>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-200 p-6">
            <p className="text-xs text-slate-500 text-center">
              FIGMINTS Proposals v1.0
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileNavigation