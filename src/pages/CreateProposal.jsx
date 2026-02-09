import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Send, Eye, Check, AlertCircle } from 'lucide-react'

const CreateProposal = () => {
  const navigate = useNavigate()
  const [proposal, setProposal] = useState({
    title: '',
    description: '',
    client: '',
    amount: '',
    deadline: '',
    type: 'project'
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!proposal.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!proposal.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!proposal.client.trim()) {
      newErrors.client = 'Client name is required'
    }
    
    if (proposal.amount && parseFloat(proposal.amount) < 0) {
      newErrors.amount = 'Amount cannot be negative'
    }
    
    if (proposal.deadline && new Date(proposal.deadline) < new Date()) {
      newErrors.deadline = 'Deadline cannot be in the past'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newProposal = {
        ...proposal,
        id: Date.now(),
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        client: {
          name: proposal.client,
          company: 'Unknown Company',
          email: 'client@example.com'
        },
        amount: parseFloat(proposal.amount) || 0,
        progress: 0,
        milestones: []
      }
      
      console.log('Created proposal:', newProposal)
      
      // Show success message
      setShowSuccess(true)
      
      // Redirect after delay
      setTimeout(() => {
        navigate('/proposals')
      }, 2000)
      
    } catch (error) {
      console.error('Error creating proposal:', error)
      alert('Failed to create proposal. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDraft = async () => {
    if (!proposal.title.trim()) {
      setErrors({ title: 'Title is required to save draft' })
      return
    }
    
    setLoading(true)
    
    try {
      // Simulate saving draft
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Saved draft:', proposal)
      
      // Show temporary success message
      const successMsg = document.createElement('div')
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50'
      successMsg.textContent = 'Draft saved successfully!'
      document.body.appendChild(successMsg)
      
      setTimeout(() => {
        document.body.removeChild(successMsg)
      }, 3000)
      
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Failed to save draft. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = () => {
    if (!proposal.title.trim() || !proposal.description.trim()) {
      alert('Please fill in at least the title and description to preview.')
      return
    }
    
    // Navigate to preview with proposal data
    const proposalData = encodeURIComponent(JSON.stringify(proposal))
    navigate(`/proposals/preview?data=${proposalData}`)
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-green-800">
                Proposal created successfully!
              </h3>
              <p className="text-sm text-green-600 mt-1">
                Redirecting you to the proposals page...
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/proposals"
            className="btn btn-ghost btn-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Proposals
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Create New Proposal</h1>
            <p className="text-slate-600">Fill in the details for your new proposal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handlePreview}
            className="btn btn-outline btn-sm"
            disabled={loading}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </button>
          <button 
            type="button"
            onClick={handleSaveDraft}
            className="btn btn-outline btn-sm"
            disabled={loading}
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            type="submit"
            form="proposal-form"
            className="btn btn-primary btn-sm"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Create Proposal
              </>
            )}
          </button>
        </div>
      </div>

      <form id="proposal-form" onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="form-field">
              <label className="form-label">
                Proposal Title *
              </label>
              <input
                type="text"
                className={`form-input ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter proposal title..."
                value={proposal.title}
                onChange={(e) => {
                  setProposal(prev => ({ ...prev, title: e.target.value }))
                  if (errors.title) setErrors(prev => ({ ...prev, title: null }))
                }}
                required
              />
              {errors.title && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.title}
                </div>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Client Name *
              </label>
              <input
                type="text"
                className={`form-input ${errors.client ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter client name..."
                value={proposal.client}
                onChange={(e) => {
                  setProposal(prev => ({ ...prev, client: e.target.value }))
                  if (errors.client) setErrors(prev => ({ ...prev, client: null }))
                }}
                required
              />
              {errors.client && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.client}
                </div>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Proposal Value ($)
              </label>
              <input
                type="number"
                className={`form-input ${errors.amount ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="0.00"
                min="0"
                step="0.01"
                value={proposal.amount}
                onChange={(e) => {
                  setProposal(prev => ({ ...prev, amount: e.target.value }))
                  if (errors.amount) setErrors(prev => ({ ...prev, amount: null }))
                }}
              />
              {errors.amount && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.amount}
                </div>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Proposal Type
              </label>
              <select
                className="form-input"
                value={proposal.type}
                onChange={(e) => setProposal(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="project">Project Proposal</option>
                <option value="service">Service Agreement</option>
                <option value="retainer">Retainer Agreement</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">
                Deadline
              </label>
              <input
                type="date"
                className={`form-input ${errors.deadline ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                value={proposal.deadline}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setProposal(prev => ({ ...prev, deadline: e.target.value }))
                  if (errors.deadline) setErrors(prev => ({ ...prev, deadline: null }))
                }}
              />
              {errors.deadline && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.deadline}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="form-field">
              <label className="form-label">
                Description *
              </label>
              <textarea
                className={`form-input resize-none ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                rows={8}
                placeholder="Describe the proposal in detail..."
                value={proposal.description}
                onChange={(e) => {
                  setProposal(prev => ({ ...prev, description: e.target.value }))
                  if (errors.description) setErrors(prev => ({ ...prev, description: null }))
                }}
                required
              />
              {errors.description && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </div>
              )}
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-medium text-slate-900 mb-4">Quick Tips</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Be specific about deliverables and timeline</li>
                <li>• Include clear pricing breakdown</li>
                <li>• Set realistic deadlines</li>
                <li>• Add relevant attachments if needed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
          <Link to="/proposals" className="btn btn-outline btn-md">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary btn-md">
            Create Proposal
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProposal