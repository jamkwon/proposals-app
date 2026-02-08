import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Edit, Send, Download, MoreHorizontal } from 'lucide-react'

const ProposalDetail = () => {
  const { id } = useParams()

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
            <h1 className="text-2xl font-bold text-slate-900">Proposal Details</h1>
            <p className="text-slate-600">Proposal ID: {id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline btn-sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button className="btn btn-primary btn-sm">
            <Send className="h-4 w-4 mr-2" />
            Send
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="text-center py-12">
          <div className="text-4xl text-slate-300 mb-4">📄</div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Proposal Details</h3>
          <p className="text-slate-600">
            This page would show detailed proposal information, including status, milestones, 
            client communications, and document history.
          </p>
          <Link
            to="/proposals"
            className="btn btn-primary btn-md mt-6"
          >
            Back to Proposals
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProposalDetail