import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Save, Send, Eye } from 'lucide-react'

const CreateProposal = () => {
  const [proposal, setProposal] = useState({
    title: '',
    description: '',
    client: '',
    amount: '',
    deadline: '',
    type: 'project'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating proposal:', proposal)
    // TODO: Implement proposal creation
  }

  return (
    <div className="space-y-6">
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
          <button className="btn btn-outline btn-sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </button>
          <button className="btn btn-outline btn-sm">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </button>
          <button className="btn btn-primary btn-sm">
            <Send className="h-4 w-4 mr-2" />
            Send Proposal
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="form-field">
              <label className="form-label">
                Proposal Title *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter proposal title..."
                value={proposal.title}
                onChange={(e) => setProposal(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">
                Client Name *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter client name..."
                value={proposal.client}
                onChange={(e) => setProposal(prev => ({ ...prev, client: e.target.value }))}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">
                Proposal Value ($)
              </label>
              <input
                type="number"
                className="form-input"
                placeholder="0.00"
                value={proposal.amount}
                onChange={(e) => setProposal(prev => ({ ...prev, amount: e.target.value }))}
              />
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
                className="form-input"
                value={proposal.deadline}
                onChange={(e) => setProposal(prev => ({ ...prev, deadline: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="form-field">
              <label className="form-label">
                Description *
              </label>
              <textarea
                className="form-input resize-none"
                rows={8}
                placeholder="Describe the proposal in detail..."
                value={proposal.description}
                onChange={(e) => setProposal(prev => ({ ...prev, description: e.target.value }))}
                required
              />
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