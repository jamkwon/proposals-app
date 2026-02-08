import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  Clock, 
  Users,
  Calendar,
  BarChart3,
  Plus,
  ArrowRight,
  Activity
} from 'lucide-react'
import { cn } from '../lib/utils'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { mockProposals, mockAnalytics } from '../data/mockData'
import { formatCurrency, formatDate, getRelativeTime, getStatusColor } from '../lib/utils'
import { SkeletonCard, SkeletonChart } from '../components/ui/LoadingStates'
import { EmptyAnalytics } from '../components/ui/EmptyState'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState('30d')

  // Mock data calculations
  const stats = [
    {
      name: 'Total Proposals',
      value: mockAnalytics.overview.totalProposals,
      change: '+12%',
      changeType: 'increase',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Value',
      value: formatCurrency(mockAnalytics.overview.totalValue),
      change: '+8.2%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Win Rate',
      value: `${mockAnalytics.overview.winRate}%`,
      change: '+5.1%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      name: 'Avg. Time',
      value: `${mockAnalytics.overview.averageTime} days`,
      change: '-2.3%',
      changeType: 'decrease',
      icon: Clock,
      color: 'bg-amber-500'
    },
  ]

  const recentProposals = mockProposals
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 5)

  const upcomingDeadlines = mockProposals
    .filter(p => p.deadline && new Date(p.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4)

  // Chart data
  const chartColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
  const statusData = mockAnalytics.statusDistribution.map((item, index) => ({
    ...item,
    color: chartColors[index % chartColors.length]
  }))

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton for stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        
        {/* Loading skeleton for charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-600 mt-1">
            Welcome back! Here's what's happening with your proposals.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="form-input text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Link
            to="/proposals/new"
            className="btn btn-primary btn-md hover-scale focus-ring"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Proposal
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid - P3 improvement #11: Visual Hierarchy */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            whileHover={{ y: -4 }}
            className="card hover-lift cursor-pointer group"
          >
            <div className="card-content p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={cn(
                  'h-12 w-12 rounded-lg flex items-center justify-center',
                  stat.color,
                  'group-hover:scale-110 transition-transform duration-200'
                )}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.changeType === 'increase' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={cn(
                  'text-sm font-medium',
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                )}>
                  {stat.change}
                </span>
                <span className="text-sm text-slate-500 ml-1">vs last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends Chart - P2 improvement #4: Enhanced Data Visualization */}
        <motion.div variants={item} className="chart-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Monthly Trends</h3>
            <Link
              to="/analytics"
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center focus-ring rounded"
            >
              View Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalytics.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="proposals" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="won" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status Distribution - P2 improvement #4: Enhanced Data Visualization */}
        <motion.div variants={item} className="chart-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Proposal Status</h3>
            <div className="text-sm text-slate-500">Current period</div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {statusData.map((item, index) => (
              <div key={item.status} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.status}</p>
                  <p className="text-xs text-slate-500">{item.count} proposals</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Proposals */}
        <motion.div variants={item} className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Recent Proposals</h3>
              <Link
                to="/proposals"
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center focus-ring rounded"
              >
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {recentProposals.map((proposal, index) => (
                <motion.div
                  key={proposal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                  onClick={() => console.log('Navigate to proposal:', proposal.id)}
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      'group-hover:scale-105 transition-transform'
                    )}>
                      <FileText className="h-5 w-5 text-slate-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900 truncate group-hover:text-primary-700 transition-colors">
                        {proposal.title}
                      </p>
                      <p className="text-sm text-slate-500 truncate">
                        {proposal.client.name} • {formatCurrency(proposal.amount)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={cn('status-badge', getStatusColor(proposal.status))}>
                      {proposal.status.replace('_', ' ')}
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div variants={item} className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Upcoming Deadlines</h3>
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {upcomingDeadlines.length === 0 ? (
                <EmptyAnalytics />
              ) : (
                upcomingDeadlines.map((proposal, index) => (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className={cn(
                        'h-2 w-2 rounded-full',
                        proposal.priority === 'urgent' ? 'bg-red-500' :
                        proposal.priority === 'high' ? 'bg-amber-500' :
                        'bg-green-500'
                      )} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {proposal.title}
                        </p>
                        <p className="text-sm text-slate-500">
                          Due {getRelativeTime(proposal.deadline)}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={item} className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/proposals/new"
              className="flex items-center p-4 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group focus-ring"
            >
              <Plus className="h-8 w-8 text-primary-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-slate-900 group-hover:text-primary-700">Create Proposal</p>
                <p className="text-sm text-slate-500">Start a new proposal</p>
              </div>
            </Link>
            
            <Link
              to="/analytics"
              className="flex items-center p-4 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group focus-ring"
            >
              <BarChart3 className="h-8 w-8 text-primary-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-slate-900 group-hover:text-primary-700">View Analytics</p>
                <p className="text-sm text-slate-500">Detailed insights</p>
              </div>
            </Link>
            
            <button
              className="flex items-center p-4 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group focus-ring"
            >
              <Activity className="h-8 w-8 text-primary-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-slate-900 group-hover:text-primary-700">Activity Feed</p>
                <p className="text-sm text-slate-500">Recent updates</p>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard