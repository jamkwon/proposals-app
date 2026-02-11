export const PROPOSAL_STATUSES = {
  DRAFT: 'draft',
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SENT: 'sent',
  WON: 'won',
  LOST: 'lost',
}

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
}

export const PROPOSAL_TYPES = {
  PROJECT: 'project',
  SERVICE: 'service',
  RETAINER: 'retainer',
  CONSULTATION: 'consultation',
  PRODUCT: 'product',
}

// Mock clients data
export const mockClients = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    industry: 'Technology',
    avatar: null,
  },
  {
    id: '2',
    name: 'Global Marketing Inc',
    email: 'hello@globalmarketing.com',
    phone: '+1 (555) 234-5678',
    company: 'Global Marketing Inc',
    industry: 'Marketing',
    avatar: null,
  },
  {
    id: '3',
    name: 'StartupXYZ',
    email: 'founders@startupxyz.com',
    phone: '+1 (555) 345-6789',
    company: 'StartupXYZ',
    industry: 'Startup',
    avatar: null,
  },
  {
    id: '4',
    name: 'Enterprise Corp',
    email: 'procurement@enterprise.com',
    phone: '+1 (555) 456-7890',
    company: 'Enterprise Corp',
    industry: 'Enterprise',
    avatar: null,
  },
]

// Mock proposals data
export const mockProposals = [
  {
    id: '1',
    title: 'Complete Brand Redesign Project',
    description: 'Comprehensive brand identity redesign including logo, color palette, typography, and brand guidelines.',
    client: mockClients[0],
    status: PROPOSAL_STATUSES.PENDING,
    priority: PRIORITY_LEVELS.HIGH,
    type: PROPOSAL_TYPES.PROJECT,
    amount: 25000,
    currency: 'USD',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-05T14:30:00Z',
    deadline: '2026-02-15T23:59:59Z',
    estimated_hours: 120,
    deliverables: [
      'Logo design (3 concepts)',
      'Color palette and typography guide',
      'Brand guidelines document',
      'Business card and letterhead design',
      'Website mockup',
    ],
    milestones: [
      { name: 'Discovery & Research', completion: 100, dueDate: '2024-02-05' },
      { name: 'Concept Development', completion: 75, dueDate: '2024-02-08' },
      { name: 'Design Refinement', completion: 30, dueDate: '2024-02-12' },
      { name: 'Final Delivery', completion: 0, dueDate: '2024-02-15' },
    ],
    tags: ['branding', 'design', 'urgent'],
    notes: 'Client emphasized modern and minimalist approach. Budget is flexible for additional work.',
  },
  {
    id: '2',
    title: 'E-commerce Website Development',
    description: 'Custom e-commerce platform with payment integration, inventory management, and admin dashboard.',
    client: mockClients[1],
    status: PROPOSAL_STATUSES.APPROVED,
    priority: PRIORITY_LEVELS.MEDIUM,
    type: PROPOSAL_TYPES.PROJECT,
    amount: 45000,
    currency: 'USD',
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-25T16:45:00Z',
    deadline: '2026-03-01T23:59:59Z',
    estimated_hours: 300,
    deliverables: [
      'Responsive website design',
      'Shopping cart functionality',
      'Payment gateway integration',
      'Admin dashboard',
      'Mobile app companion',
    ],
    milestones: [
      { name: 'Planning & Architecture', completion: 100, dueDate: '2024-01-20' },
      { name: 'Frontend Development', completion: 85, dueDate: '2024-02-10' },
      { name: 'Backend Development', completion: 60, dueDate: '2024-02-20' },
      { name: 'Testing & Launch', completion: 0, dueDate: '2024-03-01' },
    ],
    tags: ['web development', 'ecommerce', 'react'],
    notes: 'Project approved with additional mobile app requirement added.',
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive digital marketing strategy including SEO, social media, and content marketing.',
    client: mockClients[2],
    status: PROPOSAL_STATUSES.DRAFT,
    priority: PRIORITY_LEVELS.LOW,
    type: PROPOSAL_TYPES.SERVICE,
    amount: 15000,
    currency: 'USD',
    created_at: '2024-02-05T11:30:00Z',
    updated_at: '2024-02-05T11:30:00Z',
    deadline: '2026-02-20T23:59:59Z',
    estimated_hours: 80,
    deliverables: [
      'Market research report',
      'SEO strategy document',
      'Social media calendar',
      'Content strategy guide',
      'Performance metrics setup',
    ],
    milestones: [
      { name: 'Research & Analysis', completion: 0, dueDate: '2024-02-10' },
      { name: 'Strategy Development', completion: 0, dueDate: '2024-02-15' },
      { name: 'Implementation Plan', completion: 0, dueDate: '2024-02-18' },
      { name: 'Final Presentation', completion: 0, dueDate: '2024-02-20' },
    ],
    tags: ['marketing', 'seo', 'social media'],
    notes: 'Still gathering requirements from client. Awaiting competitor analysis.',
  },
  {
    id: '4',
    title: 'Enterprise Software Consultation',
    description: 'Technical consultation for enterprise software architecture and development best practices.',
    client: mockClients[3],
    status: PROPOSAL_STATUSES.SENT,
    priority: PRIORITY_LEVELS.URGENT,
    type: PROPOSAL_TYPES.CONSULTATION,
    amount: 12000,
    currency: 'USD',
    created_at: '2024-02-03T08:00:00Z',
    updated_at: '2024-02-06T10:15:00Z',
    deadline: '2024-02-12T17:00:00Z',
    estimated_hours: 40,
    deliverables: [
      'Architecture review document',
      'Security assessment report',
      'Performance optimization plan',
      'Technology recommendations',
      'Implementation roadmap',
    ],
    milestones: [
      { name: 'Initial Assessment', completion: 100, dueDate: '2024-02-06' },
      { name: 'Deep Dive Analysis', completion: 50, dueDate: '2024-02-09' },
      { name: 'Recommendations', completion: 0, dueDate: '2024-02-11' },
      { name: 'Final Report', completion: 0, dueDate: '2024-02-12' },
    ],
    tags: ['consulting', 'enterprise', 'architecture'],
    notes: 'Urgent timeline due to upcoming board meeting. Focus on security concerns.',
  },
  {
    id: '5',
    title: 'Mobile App UI/UX Design',
    description: 'Complete UI/UX design for iOS and Android mobile application with user research and prototyping.',
    client: mockClients[0],
    status: PROPOSAL_STATUSES.REJECTED,
    priority: PRIORITY_LEVELS.MEDIUM,
    type: PROPOSAL_TYPES.PROJECT,
    amount: 18000,
    currency: 'USD',
    created_at: '2024-01-20T14:00:00Z',
    updated_at: '2024-01-30T09:30:00Z',
    deadline: '2024-02-28T23:59:59Z',
    estimated_hours: 100,
    deliverables: [
      'User research report',
      'Wireframes and user flows',
      'High-fidelity mockups',
      'Interactive prototype',
      'Design system documentation',
    ],
    milestones: [
      { name: 'User Research', completion: 100, dueDate: '2024-02-05' },
      { name: 'Wireframing', completion: 80, dueDate: '2024-02-12' },
      { name: 'Visual Design', completion: 40, dueDate: '2024-02-20' },
      { name: 'Prototyping', completion: 0, dueDate: '2024-02-28' },
    ],
    tags: ['mobile', 'ui/ux', 'prototype'],
    notes: 'Rejected due to budget constraints. Client may reconsider in Q2.',
  },
]

// Mock analytics data
export const mockAnalytics = {
  overview: {
    totalProposals: mockProposals.length,
    totalValue: mockProposals.reduce((sum, p) => sum + p.amount, 0),
    winRate: 68,
    averageTime: 12, // days
  },
  statusDistribution: [
    { status: 'Won', count: 8, value: 180000 },
    { status: 'Pending', count: 3, value: 52000 },
    { status: 'Draft', count: 2, value: 18000 },
    { status: 'Rejected', count: 2, value: 23000 },
  ],
  monthlyTrends: [
    { month: 'Jan', proposals: 12, won: 8, value: 125000 },
    { month: 'Feb', proposals: 15, won: 9, value: 180000 },
    { month: 'Mar', proposals: 18, won: 11, value: 220000 },
    { month: 'Apr', proposals: 14, won: 10, value: 195000 },
    { month: 'May', proposals: 20, won: 14, value: 285000 },
    { month: 'Jun', proposals: 16, won: 11, value: 205000 },
  ],
  clientActivity: [
    { client: 'TechCorp Solutions', proposals: 8, winRate: 75, totalValue: 180000 },
    { client: 'Global Marketing Inc', proposals: 6, winRate: 83, totalValue: 145000 },
    { client: 'StartupXYZ', proposals: 4, winRate: 50, totalValue: 65000 },
    { client: 'Enterprise Corp', proposals: 3, winRate: 67, totalValue: 95000 },
  ],
}

// Mock team members
export const mockTeamMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@figmints.net',
    role: 'Project Manager',
    avatar: null,
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@figmints.net',
    role: 'Lead Developer',
    avatar: null,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@figmints.net',
    role: 'UX Designer',
    avatar: null,
  },
]

// Mock activity feed
export const mockActivity = [
  {
    id: '1',
    type: 'proposal_created',
    message: 'New proposal created: Complete Brand Redesign Project',
    user: 'Sarah Johnson',
    timestamp: '2024-02-05T14:30:00Z',
  },
  {
    id: '2',
    type: 'proposal_approved',
    message: 'Proposal approved: E-commerce Website Development',
    user: 'Mike Chen',
    timestamp: '2024-02-04T16:45:00Z',
  },
  {
    id: '3',
    type: 'milestone_completed',
    message: 'Milestone completed: Discovery & Research',
    user: 'Emily Rodriguez',
    timestamp: '2024-02-04T11:20:00Z',
  },
]

export default {
  proposals: mockProposals,
  clients: mockClients,
  analytics: mockAnalytics,
  teamMembers: mockTeamMembers,
  activity: mockActivity,
}