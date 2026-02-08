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
            <div className="text-xs font-semibold leading-6 text-slate-400 uppercase tracking-wide">
              Quick Stats
            </div>
            <div className="mt-3 space-y-3">
              {quickStats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-x-3 text-sm">
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                  <span className="text-slate-700 font-medium">{stat.value}</span>
                  <span className="text-slate-500">{stat.name}</span>
                </div>
              ))}
            </div>
          </li>

          {/* Recent Proposals */}
          <li>
            <div className="text-xs font-semibold leading-6 text-slate-400 uppercase tracking-wide">
              Recent
            </div>
            <ul role="list" className="mt-3 space-y-2">
              {recentProposals.map((proposal) => (
                <li key={proposal.id}>
                  <NavLink
                    to={`/proposals/${proposal.id}`}
                    className={cn(
                      "group flex items-start gap-x-3 rounded-md p-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                      "focus-ring transition-colors duration-200"
                    )}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        proposal.priority === 'urgent' ? 'bg-red-500' :
                        proposal.priority === 'high' ? 'bg-amber-500' :
                        'bg-green-500'
                      )} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{proposal.title}</p>
                      <p className="truncate text-xs text-slate-500">
                        {proposal.client.name}
                      </p>
                    </div>
                  </NavLink>
                </li>
              ))}
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