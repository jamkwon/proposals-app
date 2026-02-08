export const PROPOSAL_SERVICES = {
  'brand-identity': {
    name: 'Brand Identity Design',
    description: 'Complete brand identity package including logo, colors, typography, and brand guidelines.',
    price: 15000,
    timeline: '4-6 weeks',
    customizable: true,
    includes: [
      'Logo design (3 concepts + revisions)',
      'Color palette and typography system',
      'Brand guidelines document',
      'Business card design',
      'Letterhead template',
      'Social media kit'
    ]
  },
  
  'web-design': {
    name: 'Website Design & Development',
    description: 'Custom responsive website design and development with modern UI/UX principles.',
    price: 25000,
    timeline: '6-10 weeks',
    customizable: true,
    includes: [
      'Custom responsive design',
      'Up to 10 pages',
      'Content management system',
      'SEO optimization',
      'Mobile optimization',
      'Contact forms and integrations',
      'Analytics setup'
    ]
  },
  
  'ecommerce': {
    name: 'E-commerce Development',
    description: 'Full-featured online store with payment processing, inventory management, and admin dashboard.',
    price: 35000,
    timeline: '8-12 weeks',
    customizable: true,
    includes: [
      'Custom e-commerce platform',
      'Payment gateway integration',
      'Inventory management system',
      'Customer accounts and profiles',
      'Order management',
      'Admin dashboard',
      'Mobile-responsive design',
      'Security implementation'
    ]
  },
  
  'mobile-app': {
    name: 'Mobile App Development',
    description: 'Native iOS and Android applications with custom features and integrations.',
    price: 45000,
    timeline: '12-16 weeks',
    customizable: true,
    includes: [
      'iOS and Android applications',
      'Custom UI/UX design',
      'Backend API development',
      'User authentication',
      'Push notifications',
      'App store submission',
      'Testing and QA'
    ]
  },
  
  'ui-ux-design': {
    name: 'UI/UX Design Services',
    description: 'User experience research, wireframing, prototyping, and interface design.',
    price: 12000,
    timeline: '3-5 weeks',
    customizable: true,
    includes: [
      'User research and personas',
      'Wireframing and user flows',
      'High-fidelity mockups',
      'Interactive prototypes',
      'Design system creation',
      'Usability testing'
    ]
  },
  
  'digital-marketing': {
    name: 'Digital Marketing Strategy',
    description: 'Comprehensive digital marketing strategy including SEO, social media, and content marketing.',
    price: 8000,
    timeline: '2-4 weeks',
    customizable: true,
    includes: [
      'Market research and analysis',
      'SEO strategy and implementation',
      'Social media marketing plan',
      'Content calendar creation',
      'Performance tracking setup',
      'Monthly reporting'
    ]
  },
  
  'consulting': {
    name: 'Technical Consulting',
    description: 'Expert technical consultation for architecture, strategy, and implementation planning.',
    price: 5000,
    timeline: '1-2 weeks',
    customizable: true,
    includes: [
      'Technical architecture review',
      'Technology stack recommendations',
      'Performance optimization plan',
      'Security assessment',
      'Implementation roadmap',
      'Best practices documentation'
    ]
  },
  
  'maintenance': {
    name: 'Website Maintenance & Support',
    description: 'Ongoing website maintenance, updates, security monitoring, and technical support.',
    price: 2000,
    timeline: 'Monthly',
    customizable: true,
    includes: [
      'Regular security updates',
      'Content updates and changes',
      'Performance monitoring',
      'Backup management',
      'Technical support',
      'Monthly reporting'
    ]
  },
  
  'seo-optimization': {
    name: 'SEO Optimization',
    description: 'Search engine optimization to improve website visibility and organic traffic.',
    price: 6000,
    timeline: '3-6 months',
    customizable: true,
    includes: [
      'Comprehensive SEO audit',
      'Keyword research and strategy',
      'On-page optimization',
      'Technical SEO improvements',
      'Content optimization',
      'Monthly progress reports'
    ]
  },
  
  'content-creation': {
    name: 'Content Creation Services',
    description: 'Professional content creation including copywriting, photography, and video production.',
    price: 4000,
    timeline: '2-4 weeks',
    customizable: true,
    includes: [
      'Website copywriting',
      'Blog content creation',
      'Professional photography',
      'Video content production',
      'Social media content',
      'Content strategy planning'
    ]
  },
  
  'analytics-setup': {
    name: 'Analytics & Tracking Setup',
    description: 'Comprehensive analytics implementation for data-driven decision making.',
    price: 3000,
    timeline: '1-2 weeks',
    customizable: true,
    includes: [
      'Google Analytics 4 setup',
      'Conversion tracking configuration',
      'Custom dashboard creation',
      'Goal and event setup',
      'Monthly reporting templates',
      'Training and documentation'
    ]
  },
  
  'hosting-setup': {
    name: 'Professional Hosting & Domain',
    description: 'Enterprise-grade hosting setup with domain management and SSL certificates.',
    price: 1500,
    timeline: '1 week',
    customizable: true,
    includes: [
      'Premium hosting setup',
      'Domain registration/transfer',
      'SSL certificate installation',
      'Email accounts setup',
      'DNS management',
      'Backup configuration'
    ]
  },
  
  'training': {
    name: 'Team Training & Documentation',
    description: 'Comprehensive training for your team on managing and updating your digital assets.',
    price: 2500,
    timeline: '1 week',
    customizable: true,
    includes: [
      'Live training sessions',
      'Video tutorials creation',
      'User documentation',
      'Best practices guide',
      'Ongoing support access',
      'Q&A sessions'
    ]
  },
  
  'api-integration': {
    name: 'Third-Party API Integration',
    description: 'Integration with external services, payment gateways, CRM systems, and other tools.',
    price: 7500,
    timeline: '2-4 weeks',
    customizable: true,
    includes: [
      'API analysis and planning',
      'Custom integration development',
      'Data synchronization setup',
      'Error handling and logging',
      'Testing and validation',
      'Documentation and support'
    ]
  },
  
  'security-audit': {
    name: 'Security Audit & Implementation',
    description: 'Comprehensive security assessment and implementation of security best practices.',
    price: 4500,
    timeline: '1-2 weeks',
    customizable: true,
    includes: [
      'Security vulnerability assessment',
      'Penetration testing',
      'Security recommendations',
      'Implementation of security measures',
      'Security monitoring setup',
      'Compliance documentation'
    ]
  }
}

export const SERVICE_CATEGORIES = {
  'Design & Branding': ['brand-identity', 'ui-ux-design', 'content-creation'],
  'Development': ['web-design', 'ecommerce', 'mobile-app', 'api-integration'],
  'Marketing & SEO': ['digital-marketing', 'seo-optimization', 'analytics-setup'],
  'Support & Maintenance': ['maintenance', 'hosting-setup', 'training', 'security-audit'],
  'Consulting': ['consulting']
}

// Helper function to get services by category
export const getServicesByCategory = () => {
  const categorized = {}
  
  Object.entries(SERVICE_CATEGORIES).forEach(([category, serviceIds]) => {
    categorized[category] = serviceIds.map(id => ({
      id,
      ...PROPOSAL_SERVICES[id]
    }))
  })
  
  return categorized
}