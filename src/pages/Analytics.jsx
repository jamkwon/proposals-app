import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  Users, 
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Calendar as CalendarIcon
} from 'lucide-react'
import { cn } from '../lib/utils'
import { mockProposals } from '../data/mockData'
import { formatCurrency, formatDate } from '../lib/utils'
import { EmptyAnalytics } from '../components/ui/EmptyState'

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30') // days
  const [loading, setLoading] = useState(false)

  // Calculate analytics data
  const analytics = useMemo(() => {
    const now = new Date()
    const daysBack = parseInt(dateRange)
    const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000))

    const filteredProposals = mockProposals.filter(p => 
      new Date(p.created_at) >= startDate
    )

    const totalValue = filteredProposals.reduce((sum, p) => sum + p.amount, 0)
    const totalProposals = filteredProposals.length
    const approvedProposals = filteredProposals.filter(p => p.status === 'approved')
    const rejectedProposals = filteredProposals.filter(p => p.status === 'rejected')
    const pendingProposals = filteredProposals.filter(p => p.status === 'pending')
    
    const approvalRate = totalProposals > 0 ? (approvedProposals.length / totalProposals) * 100 : 0
    const avgProposalValue = totalProposals > 0 ? totalValue / totalProposals : 0

    const statusDistribution = [
      { name: 'Approved', value: approvedProposals.length, color: 'bg-green-500' },
      { name: 'Pending', value: pendingProposals.length, color: 'bg-yellow-500' },
      { name: 'Rejected', value: rejectedProposals.length, color: 'bg-red-500' }
    ]

    const clientStats = filteredProposals.reduce((acc, p) => {
      const clientName = p.client.name
      if (!acc[clientName]) {
        acc[clientName] = { proposals: 0, value: 0 }
      }
      acc[clientName].proposals++
      acc[clientName].value += p.amount
      return acc
    }, {})

    const topClients = Object.entries(clientStats)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)

    return {
      totalValue,
      totalProposals,
      approvalRate,
      avgProposalValue,
      statusDistribution,
      topClients,
      approvedValue: approvedProposals.reduce((sum, p) => sum + p.amount, 0)
    }
  }, [dateRange])

  // If no data, show empty state
  if (analytics.totalProposals === 0) {
    return <EmptyAnalytics />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics & Reports</h1>
          <p className="text-slate-600 mt-2">
            Insights and performance metrics for your proposals
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="form-input w-auto"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <button className="btn btn-outline btn-md">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Proposals"
          value={analytics.totalProposals.toString()}
          icon={FileText}
          trend={analytics.totalProposals > 0 ? '+12%' : '0%'}
          trendUp={true}
        />
        <MetricCard
          title="Total Value"
          value={formatCurrency(analytics.totalValue)}
          icon={DollarSign}
          trend="+8.2%"
          trendUp={true}
        />
        <MetricCard
          title="Approval Rate"
          value={`${analytics.approvalRate.toFixed(1)}%`}
          icon={TrendingUp}
          trend="+2.1%"
          trendUp={true}
        />
        <MetricCard
          title="Avg. Value"
          value={formatCurrency(analytics.avgProposalValue)}
          icon={BarChart3}
          trend="-1.3%"
          trendUp={false}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-slate-900">Proposal Status</h3>
            <PieChart className="h-6 w-6 text-slate-400" />
          </div>
          <div className="space-y-6">
            {analytics.statusDistribution.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('w-4 h-4 rounded-full', item.color)} />
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-900 font-semibold">{item.value}</span>
                  <div className="text-sm text-slate-500">
                    {analytics.totalProposals > 0 ? 
                      `${((item.value / analytics.totalProposals) * 100).toFixed(1)}%` : 
                      '0%'
                    }
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-slate-900">Performance Overview</h3>
            <BarChart3 className="h-6 w-6 text-slate-400" />
          </div>
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-700 font-medium">Success Rate</span>
                <span className="text-slate-900 font-semibold">{analytics.approvalRate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analytics.approvalRate}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-green-500 h-3 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-700 font-medium">Revenue Conversion</span>
                <span className="text-slate-900 font-semibold">
                  {formatCurrency(analytics.approvedValue)}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${analytics.totalValue > 0 ? (analytics.approvedValue / analytics.totalValue) * 100 : 0}%` 
                  }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="bg-blue-500 h-3 rounded-full"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                Average time to decision: <span className="font-medium text-slate-900">5.2 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Clients */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-slate-900">Top Clients by Value</h3>
          <Users className="h-6 w-6 text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-2 text-sm font-medium text-slate-500">Client</th>
                <th className="text-left py-4 px-2 text-sm font-medium text-slate-500">Proposals</th>
                <th className="text-left py-4 px-2 text-sm font-medium text-slate-500">Total Value</th>
                <th className="text-left py-4 px-2 text-sm font-medium text-slate-500">Avg. Value</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topClients.map((client, index) => (
                <motion.tr
                  key={client.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4 px-2">
                    <div className="font-medium text-slate-900">{client.name}</div>
                  </td>
                  <td className="py-4 px-2 text-slate-700">{client.proposals}</td>
                  <td className="py-4 px-2 font-medium text-slate-900">
                    {formatCurrency(client.value)}
                  </td>
                  <td className="py-4 px-2 text-slate-700">
                    {formatCurrency(client.value / client.proposals)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Recent Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {analytics.statusDistribution.find(s => s.name === 'Approved')?.value || 0}
            </div>
            <div className="text-slate-600">Proposals Approved</div>
            <div className="text-sm text-slate-500 mt-1">Last {dateRange} days</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {analytics.statusDistribution.find(s => s.name === 'Pending')?.value || 0}
            </div>
            <div className="text-slate-600">Awaiting Response</div>
            <div className="text-sm text-slate-500 mt-1">Requires follow-up</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatCurrency(analytics.avgProposalValue)}
            </div>
            <div className="text-slate-600">Average Deal Size</div>
            <div className="text-sm text-slate-500 mt-1">Per proposal</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Metric Card Component
const MetricCard = ({ title, value, icon: Icon, trend, trendUp }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg border border-slate-200 p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
      </div>
      <div className="p-3 bg-slate-50 rounded-lg">
        <Icon className="h-6 w-6 text-slate-600" />
      </div>
    </div>
    
    <div className="mt-4 flex items-center">
      <div className={cn(
        "flex items-center text-sm font-medium",
        trendUp ? "text-green-600" : "text-red-600"
      )}>
        {trendUp ? (
          <TrendingUp className="h-4 w-4 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 mr-1" />
        )}
        {trend}
      </div>
      <span className="text-sm text-slate-500 ml-2">vs last period</span>
    </div>
  </motion.div>
)

export default Analytics