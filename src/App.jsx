import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Proposals from './pages/Proposals'
import ProposalDetail from './pages/ProposalDetail'
import CreateProposal from './pages/CreateProposal'
import ProposalBuilder from './pages/ProposalBuilder'
import ProposalPreview from './pages/ProposalPreview'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/proposals/new" element={<CreateProposal />} />
        <Route path="/proposals/builder" element={<ProposalBuilder />} />
        <Route path="/proposals/preview" element={<ProposalPreview />} />
        <Route path="/proposals/:id" element={<ProposalDetail />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App