import React, { useState } from 'react'
import { User, Bell, Shield, Palette, Database, Download } from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  
  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'data', name: 'Data & Privacy', icon: Database }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 border-r border-slate-200 p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-8">
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'appearance' && <AppearanceSettings />}
            {activeTab === 'data' && <DataSettings />}
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileSettings = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-slate-900">Profile Settings</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="form-field">
        <label className="form-label">Full Name</label>
        <input type="text" className="form-input" defaultValue="John Doe" />
      </div>
      
      <div className="form-field">
        <label className="form-label">Email Address</label>
        <input type="email" className="form-input" defaultValue="john@figmints.net" />
      </div>
      
      <div className="form-field">
        <label className="form-label">Company</label>
        <input type="text" className="form-input" defaultValue="FIGMINTS" />
      </div>
      
      <div className="form-field">
        <label className="form-label">Phone Number</label>
        <input type="tel" className="form-input" defaultValue="+1 (555) 123-4567" />
      </div>
    </div>
    
    <div className="flex justify-end">
      <button className="btn btn-primary btn-md">Save Changes</button>
    </div>
  </div>
)

const NotificationSettings = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-slate-900">Notification Preferences</h2>
    
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
        <div>
          <h3 className="font-medium text-slate-900">Email Notifications</h3>
          <p className="text-sm text-slate-600">Receive updates about proposal activity</p>
        </div>
        <input type="checkbox" className="form-checkbox" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
        <div>
          <h3 className="font-medium text-slate-900">Proposal Status Updates</h3>
          <p className="text-sm text-slate-600">Get notified when proposal status changes</p>
        </div>
        <input type="checkbox" className="form-checkbox" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
        <div>
          <h3 className="font-medium text-slate-900">Weekly Digest</h3>
          <p className="text-sm text-slate-600">Summary of weekly activity</p>
        </div>
        <input type="checkbox" className="form-checkbox" />
      </div>
    </div>
  </div>
)

const SecuritySettings = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-slate-900">Security Settings</h2>
    
    <div className="space-y-6">
      <div className="form-field">
        <label className="form-label">Current Password</label>
        <input type="password" className="form-input" />
      </div>
      
      <div className="form-field">
        <label className="form-label">New Password</label>
        <input type="password" className="form-input" />
      </div>
      
      <div className="form-field">
        <label className="form-label">Confirm New Password</label>
        <input type="password" className="form-input" />
      </div>
    </div>
    
    <div className="flex justify-end">
      <button className="btn btn-primary btn-md">Update Password</button>
    </div>
  </div>
)

const AppearanceSettings = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-slate-900">Appearance</h2>
    
    <div className="space-y-4">
      <div>
        <label className="form-label">Theme</label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <div className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
            <input type="radio" name="theme" value="light" className="mr-3" defaultChecked />
            <span>Light Mode</span>
          </div>
          <div className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
            <input type="radio" name="theme" value="dark" className="mr-3" />
            <span>Dark Mode</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const DataSettings = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-slate-900">Data & Privacy</h2>
    
    <div className="space-y-4">
      <div className="bg-slate-50 p-6 rounded-lg">
        <h3 className="font-medium text-slate-900 mb-2">Export Your Data</h3>
        <p className="text-sm text-slate-600 mb-4">
          Download a copy of all your proposal data and settings.
        </p>
        <button className="btn btn-outline btn-sm">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
      </div>
      
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="font-medium text-red-900 mb-2">Delete Account</h3>
        <p className="text-sm text-red-600 mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="btn btn-outline text-red-600 border-red-200 hover:bg-red-50 btn-sm">
          Delete Account
        </button>
      </div>
    </div>
  </div>
)

export default Settings