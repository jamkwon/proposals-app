import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Save, Eye, CheckSquare, Square, Plus, X, DollarSign } from 'lucide-react'
import { PROPOSAL_SERVICES } from '../data/proposalServices'
import { motion, AnimatePresence } from 'framer-motion'

const ProposalBuilder = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState({})
  const [customizations, setCustomizations] = useState({
    clientName: '',
    clientCompany: '',
    projectTitle: '',
    projectDescription: '',
    timeline: '',
    additionalNotes: ''
  })
  const [totalAmount, setTotalAmount] = useState(0)

  // Calculate total amount when services change
  useEffect(() => {
    const total = Object.entries(selectedServices).reduce((sum, [serviceId, service]) => {
      if (service.selected) {
        return sum + (service.price || 0)
      }
      return sum
    }, 0)
    setTotalAmount(total)
  }, [selectedServices])

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        selected: !prev[serviceId]?.selected,
        ...PROPOSAL_SERVICES[serviceId]
      }
    }))
  }

  const handleServiceCustomization = (serviceId, field, value) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [field]: value
      }
    }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Generate proposal
      handleGenerateProposal()
    }
  }

  const handleGenerateProposal = () => {
    const proposalData = {
      services: selectedServices,
      customizations,
      totalAmount,
      generatedAt: new Date().toISOString()
    }
    
    // Store in localStorage for the preview page
    localStorage.setItem('generatedProposal', JSON.stringify(proposalData))
    
    // Navigate to the generated proposal
    navigate('/proposals/preview')
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`
            flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
            ${currentStep >= step 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'border-gray-300 text-gray-400'
            }
          `}>
            {step}
          </div>
          {step < 3 && (
            <div className={`
              w-16 h-1 transition-colors
              ${currentStep > step ? 'bg-blue-600' : 'bg-gray-300'}
            `} />
          )}
        </React.Fragment>
      ))}
    </div>
  )

  const renderServiceChecklist = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Services</h2>
        <p className="text-gray-600">Choose the services you'd like to include in your proposal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(PROPOSAL_SERVICES).map(([serviceId, service]) => {
          const isSelected = selectedServices[serviceId]?.selected || false
          
          return (
            <motion.div
              key={serviceId}
              className={`
                relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }
              `}
              onClick={() => handleServiceToggle(serviceId)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                  {isSelected ? (
                    <CheckSquare className="h-6 w-6 text-blue-600" />
                  ) : (
                    <Square className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ${service.price?.toLocaleString() || 'Quote'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {service.timeline || 'Custom timeline'}
                    </span>
                  </div>

                  {service.includes && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-700 mb-1">Includes:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {service.includes.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {isSelected && (
                <motion.div
                  className="mt-4 pt-4 border-t border-blue-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Custom Notes (Optional)
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        rows="2"
                        placeholder="Add any specific requirements or notes..."
                        value={selectedServices[serviceId]?.notes || ''}
                        onChange={(e) => handleServiceCustomization(serviceId, 'notes', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    
                    {service.customizable && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Custom Price
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder={service.price}
                          value={selectedServices[serviceId]?.customPrice || ''}
                          onChange={(e) => handleServiceCustomization(serviceId, 'customPrice', parseInt(e.target.value) || service.price)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {Object.values(selectedServices).some(s => s.selected) && (
        <motion.div
          className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-800">
                {Object.values(selectedServices).filter(s => s.selected).length} Services Selected
              </h3>
              <p className="text-green-600">
                Total Estimated Value: <span className="text-2xl font-bold">${totalAmount.toLocaleString()}</span>
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </motion.div>
      )}
    </div>
  )

  const renderCustomizationForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Your Proposal</h2>
        <p className="text-gray-600">Add client details and project information</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter client name..."
                value={customizations.clientName}
                onChange={(e) => setCustomizations(prev => ({...prev, clientName: e.target.value}))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Company *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter company name..."
                value={customizations.clientCompany}
                onChange={(e) => setCustomizations(prev => ({...prev, clientCompany: e.target.value}))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project title..."
                value={customizations.projectTitle}
                onChange={(e) => setCustomizations(prev => ({...prev, projectTitle: e.target.value}))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Timeline
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 6-8 weeks"
                value={customizations.timeline}
                onChange={(e) => setCustomizations(prev => ({...prev, timeline: e.target.value}))}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="5"
                placeholder="Describe the project objectives and goals..."
                value={customizations.projectDescription}
                onChange={(e) => setCustomizations(prev => ({...prev, projectDescription: e.target.value}))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="5"
                placeholder="Any additional requirements, constraints, or special considerations..."
                value={customizations.additionalNotes}
                onChange={(e) => setCustomizations(prev => ({...prev, additionalNotes: e.target.value}))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSummary = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Proposal</h2>
        <p className="text-gray-600">Review all details before generating your proposal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Client:</span>
                <p className="text-gray-900">{customizations.clientName} at {customizations.clientCompany}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Project:</span>
                <p className="text-gray-900">{customizations.projectTitle}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Timeline:</span>
                <p className="text-gray-900">{customizations.timeline || 'To be determined'}</p>
              </div>
              {customizations.projectDescription && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Description:</span>
                  <p className="text-gray-900 text-sm">{customizations.projectDescription}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Total Investment</h3>
            <p className="text-3xl font-bold text-green-600">${totalAmount.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">
              {Object.values(selectedServices).filter(s => s.selected).length} services included
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Services</h3>
            <div className="space-y-3">
              {Object.entries(selectedServices)
                .filter(([_, service]) => service.selected)
                .map(([serviceId, service]) => (
                  <div key={serviceId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      {service.notes && (
                        <p className="text-xs text-gray-600">Note: {service.notes}</p>
                      )}
                    </div>
                    <span className="font-semibold text-green-600">
                      ${(service.customPrice || service.price)?.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const canProceed = () => {
    if (currentStep === 1) {
      return Object.values(selectedServices).some(s => s.selected)
    }
    if (currentStep === 2) {
      return customizations.clientName && customizations.clientCompany && customizations.projectTitle && customizations.projectDescription
    }
    return true
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/proposals"
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Proposals
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Proposal Builder</h1>
                <p className="text-gray-600">Create professional proposals in minutes</p>
              </div>
            </div>
          </div>
        </div>

        {renderStepIndicator()}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && renderServiceChecklist()}
            {currentStep === 2 && renderCustomizationForm()}
            {currentStep === 3 && renderSummary()}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
          <button
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            className={`
              flex items-center px-6 py-3 rounded-lg transition-colors
              ${currentStep === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }
            `}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          <div className="flex items-center gap-3">
            <button className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`
                flex items-center px-8 py-3 rounded-lg transition-colors
                ${canProceed()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {currentStep === 3 ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Generate Proposal
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalBuilder