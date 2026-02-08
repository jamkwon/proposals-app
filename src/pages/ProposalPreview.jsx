import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Send, Edit, Printer, Share2, Calendar, DollarSign, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'

const ProposalPreview = () => {
  const navigate = useNavigate()
  const [proposalData, setProposalData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get proposal data from localStorage
    const data = localStorage.getItem('generatedProposal')
    if (data) {
      setProposalData(JSON.parse(data))
    } else {
      // Redirect back to builder if no data
      navigate('/proposals/builder')
    }
    setLoading(false)
  }, [navigate])

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    // This would integrate with a PDF generation service
    alert('PDF download functionality would be implemented here')
  }

  const handleSendProposal = () => {
    // This would integrate with email service
    alert('Email sending functionality would be implemented here')
  }

  if (loading || !proposalData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading proposal...</p>
        </div>
      </div>
    )
  }

  const selectedServices = Object.entries(proposalData.services).filter(([_, service]) => service.selected)
  const { customizations, totalAmount } = proposalData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Hidden in print */}
      <div className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/proposals/builder"
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Builder
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Proposal Preview</h1>
                <p className="text-gray-600">Review and send your proposal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/proposals/builder')}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </button>
              
              <button
                onClick={handleDownloadPDF}
                className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
              
              <button
                onClick={handleSendProposal}
                className="flex items-center px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Proposal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Content - Optimized for printing */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
        {/* Proposal Header */}
        <div className="px-8 py-12 print:px-0 print:py-8">
          <div className="border-b-4 border-blue-600 pb-8 mb-8">
            <div className="flex items-start justify-between">
              <div>
                <img 
                  src="/api/placeholder/200/60" 
                  alt="FIGMINTS Agency" 
                  className="h-12 mb-6"
                />
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Project Proposal</h1>
                <p className="text-xl text-gray-600">{customizations.projectTitle}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-2">Proposal Date</div>
                <div className="text-lg font-semibold">{format(new Date(proposalData.generatedAt), 'MMMM dd, yyyy')}</div>
                <div className="mt-4 text-sm text-gray-600">Proposal #</div>
                <div className="font-mono text-sm">FIG-{format(new Date(proposalData.generatedAt), 'yyyyMMdd')}-001</div>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Client:</span>
                  <span className="ml-2 font-medium">{customizations.clientName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Company:</span>
                  <span className="ml-2 font-medium">{customizations.clientCompany}</span>
                </div>
                {customizations.timeline && (
                  <div>
                    <span className="text-gray-600">Timeline:</span>
                    <span className="ml-2 font-medium">{customizations.timeline}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">FIGMINTS Agency</h2>
              <div className="space-y-2 text-gray-600">
                <div>Professional Digital Solutions</div>
                <div>contact@figmints.net</div>
                <div>+1 (555) 123-4567</div>
                <div>www.figmints.net</div>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {customizations.projectDescription}
              </p>
              
              {customizations.additionalNotes && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Requirements</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {customizations.additionalNotes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Services & Pricing */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Services & Investment</h2>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Timeline</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedServices.map(([serviceId, service], index) => (
                    <tr key={serviceId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{service.name}</div>
                        {service.notes && (
                          <div className="text-sm text-gray-600 mt-1">{service.notes}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{service.description}</div>
                        {service.includes && service.includes.length > 0 && (
                          <div className="mt-2">
                            <ul className="text-xs text-gray-600 space-y-1">
                              {service.includes.slice(0, 3).map((item, i) => (
                                <li key={i} className="flex items-center">
                                  <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                              {service.includes.length > 3 && (
                                <li className="text-gray-500">+ {service.includes.length - 3} more items</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {service.timeline || 'Custom'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-semibold text-gray-900">
                          ${(service.customPrice || service.price)?.toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-blue-50">
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-right">
                      <div className="text-lg font-semibold text-gray-900">Total Investment:</div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        ${totalAmount.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Review & Approve</h3>
                  <p className="text-gray-600 text-sm mt-1">Review this proposal and let us know if you have any questions or modifications.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Sign Agreement</h3>
                  <p className="text-gray-600 text-sm mt-1">Once approved, we'll send you a detailed contract to formalize our partnership.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Project Kickoff</h3>
                  <p className="text-gray-600 text-sm mt-1">We'll schedule a kickoff meeting to align on goals and begin the project.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Payment Terms</h3>
                <ul className="space-y-2">
                  <li>• 50% deposit required to begin work</li>
                  <li>• Remaining balance due upon project completion</li>
                  <li>• Payment terms: Net 30 days</li>
                  <li>• Late payments subject to 1.5% monthly fee</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Project Terms</h3>
                <ul className="space-y-2">
                  <li>• Proposal valid for 30 days</li>
                  <li>• Scope changes require written approval</li>
                  <li>• Client responsible for content and assets</li>
                  <li>• 3 rounds of revisions included per deliverable</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Ready to Get Started?</h3>
              <p className="text-blue-700 mb-4">
                We're excited about the opportunity to work with {customizations.clientCompany} on this project. 
                Our team is ready to bring your vision to life with professional, results-driven solutions.
              </p>
              <div className="text-sm text-blue-600">
                <strong>Contact us:</strong> contact@figmints.net | +1 (555) 123-4567
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>© 2024 FIGMINTS Agency. All rights reserved.</p>
            <p className="mt-1">This proposal was generated on {format(new Date(proposalData.generatedAt), 'MMMM dd, yyyy \'at\' h:mm a')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalPreview