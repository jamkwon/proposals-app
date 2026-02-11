import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  Users,
  Clock,
  TrendingUp,
  Archive,
  Star,
  Wand2,
  Plus
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { mockProposals } from '../../data/mockData'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, current: false },
  { name: 'Proposals', href: '/proposals', icon: FileText, current: false },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, current: false },
  { name: 'Settings', href: '/settings', icon: Settings, current: false },
]

const quickStats = [
  { 
    name: 'Active Proposals', 
    value: mockProposals.filter(p => ['pending', 'under_review', 'sent'].includes(p.status)).length,
    icon: Clock,
    color: 'text-blue-600'
  },
  { 
    name: 'Won This Month', 
    value: mockProposals.filter(p => p.status === 'won').length,
    icon: TrendingUp,
    color: 'text-green-600'
  },
  { 
    name: 'Draft Proposals', 
    value: mockProposals.filter(p => p.status === 'draft').length,
    icon: Archive,
    color: 'text-amber-600'
  },
]

const recentProposals = mockProposals
  .filter(p => p.status !== 'draft')
  .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  .slice(0, 3)

const Sidebar = () => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-slate-200">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="ml-2 text-xl font-bold text-slate-900">FIGMINTS</span>
        </div>
      </div>

      {/* Proposal Builder CTA */}
      <div className="px-2">
        <NavLink
          to="/proposals/builder"
          className="group relative flex w-full items-center justify-center gap-x-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-105"
        >
          <Wand2 className="h-4 w-4" />
          <span>New Proposal Builder</span>
          <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          {/* Main Navigation */}
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors duration-200",
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
                </li>
              ))}
            </ul>
          </li>

          {/* Quick Stats */}
          <li>
            <div className="text-xs font-semibold leading-6 text-slate-400 uppercase tracking-wide mb-3">
              Quick Stats
            </div>
            <div className="space-y-3">
              {quickStats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-x-3 text-sm p-2 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center bg-opacity-10 group-hover:bg-opacity-20 transition-colors",
                    stat.color === 'text-blue-600' ? 'bg-blue-500' : 
                    stat.color === 'text-green-600' ? 'bg-green-500' : 'bg-amber-500'
                  )}>
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-900 font-semibold text-lg">{stat.value}</span>
                    <p className="text-slate-600 text-xs">{stat.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </li>

          {/* Recent Proposals */}
          <li>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold leading-6 text-slate-400 uppercase tracking-wide">
                Recent
              </div>
              <NavLink 
                to="/proposals"
                className="text-xs text-primary-600 hover:text-primary-700 font-medium focus-ring rounded"
              >
                View all
              </NavLink>
            </div>
            <ul role="list" className="space-y-2">
              {recentProposals.map((proposal, index) => (
                <li key={proposal.id}>
                  <NavLink
                    to={`/proposals/${proposal.id}`}
                    className={cn(
                      "group flex items-start gap-x-3 rounded-lg p-3 text-sm hover:bg-slate-50 hover:shadow-sm",
                      "focus-ring transition-all duration-200 border border-transparent hover:border-slate-200"
                    )}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className={cn(
                        "h-2 w-2 rounded-full ring-2 ring-white shadow-sm",
                        proposal.priority === 'urgent' ? 'bg-red-500' :
                        proposal.priority === 'high' ? 'bg-amber-500' :
                        'bg-green-500'
                      )} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-slate-900 group-hover:text-primary-700 transition-colors">
                        {proposal.title}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="truncate text-xs text-slate-500">
                          {proposal.client.name}
                        </p>
                        <span className={cn(
                          'inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium',
                          proposal.status === 'won' ? 'text-green-700 bg-green-50' :
                          proposal.status === 'sent' ? 'text-blue-700 bg-blue-50' :
                          proposal.status === 'pending' ? 'text-amber-700 bg-amber-50' :
                          'text-slate-700 bg-slate-50'
                        )}>
                          {proposal.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </li>
              ))}
              
              {recentProposals.length === 0 && (
                <li className="text-center py-6">
                  <div className="text-slate-400 text-sm">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p>No recent proposals</p>
                    <NavLink 
                      to="/proposals/new"
                      className="text-primary-600 hover:text-primary-700 text-xs font-medium mt-1 inline-block focus-ring rounded"
                    >
                      Create your first proposal
                    </NavLink>
                  </div>
                </li>
              )}
            </ul>
          </li>

          {/* Spacer */}
          <li className="mt-auto">
            <div className="border-t border-slate-200 pt-4">
              <div className="flex items-center gap-x-3 text-sm text-slate-500">
                <Star className="h-4 w-4" />
                <span>FIGMINTS Proposals v1.0</span>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar