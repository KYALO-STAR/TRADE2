'use client'

import { useState, type FC, type ReactElement } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard,
  Users, 
  Settings, 
  BarChart2,
  Activity,
  Upload
} from 'lucide-react'

// Placeholder components for different admin sections
const AnalyticsDashboard: FC = (): ReactElement => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold text-gray-200 mb-4">Analytics Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Placeholder for stats cards */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-400">Total Users</h3>
        <p className="text-3xl font-bold text-white">0</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-400">Total Revenue</h3>
        <p className="text-3xl font-bold text-white">$0</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-400">Total Trades</h3>
        <p className="text-3xl font-bold text-white">0</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-400">Commissions</h3>
        <p className="text-3xl font-bold text-white">$0</p>
      </div>
    </div>
    <div className="mt-8 bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-400 mb-4">Activity Chart</h3>
      <div className="h-64 bg-gray-700 rounded-md flex items-center justify-center">
        <BarChart2 className="w-12 h-12 text-gray-500" />
        <p className="text-gray-500 ml-4">Chart data will be displayed here</p>
      </div>
    </div>
  </div>
);

const UserManagement: FC = (): ReactElement => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold text-gray-200 mb-4">User Management</h2>
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="h-96 bg-gray-700 rounded-md flex items-center justify-center">
        <Users className="w-12 h-12 text-gray-500" />
        <p className="text-gray-500 ml-4">User table will be displayed here</p>
      </div>
    </div>
  </div>
);

const ContentManagement: FC = (): ReactElement => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold text-gray-200 mb-6">Content Management</h2>
    
    {/* Media Library */}
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">Media Library</h3>
      
      {/* Upload Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        
        {/* Video Management */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video Content
            </h4>
            <span className="text-sm text-gray-400">24 files</span>
          </div>
          
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-red-400 transition-colors cursor-pointer">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-300 mb-2">Drop videos here</p>
            <p className="text-xs text-gray-500">MP4, AVI, MOV up to 1GB</p>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">trading_intro.mp4</span>
              <span className="text-green-400">Ready</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">risk_management.mp4</span>
              <span className="text-yellow-400">Processing</span>
            </div>
          </div>
        </div>

        {/* PDF Management */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF Documents
            </h4>
            <span className="text-sm text-gray-400">18 files</span>
          </div>
          
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-300 mb-2">Drop PDFs here</p>
            <p className="text-xs text-gray-500">PDF files up to 100MB</p>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">trading_guide.pdf</span>
              <span className="text-green-400">Ready</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">market_analysis.pdf</span>
              <span className="text-green-400">Ready</span>
            </div>
          </div>
        </div>

        {/* Audio Management */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Audio Content
            </h4>
            <span className="text-sm text-gray-400">12 files</span>
          </div>
          
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-300 mb-2">Drop audio files</p>
            <p className="text-xs text-gray-500">MP3, WAV up to 200MB</p>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">podcast_ep1.mp3</span>
              <span className="text-green-400">Ready</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">webinar_audio.wav</span>
              <span className="text-green-400">Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Operations */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h4 className="text-lg font-semibold text-white mb-4">Bulk Operations</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m0 0V10" />
            </svg>
            <div className="text-left">
              <p className="text-white font-medium">Zip Upload</p>
              <p className="text-xs text-gray-400">Multiple files at once</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <div className="text-left">
              <p className="text-white font-medium">Cloud Import</p>
              <p className="text-xs text-gray-400">From Google Drive/Dropbox</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <div className="text-left">
              <p className="text-white font-medium">URL Import</p>
              <p className="text-xs text-gray-400">From external links</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <div className="text-left">
              <p className="text-white font-medium">Bulk Delete</p>
              <p className="text-xs text-gray-400">Remove selected files</p>
            </div>
          </button>
        </div>
      </div>

      {/* File Manager */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-white">File Manager</h4>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
              New Folder
            </button>
            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
              Upload
            </button>
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Folder items */}
            <div className="flex items-center gap-3 p-3 bg-gray-600 rounded-lg hover:bg-gray-500 cursor-pointer">
              <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              </svg>
              <div>
                <p className="text-white font-medium">Videos</p>
                <p className="text-xs text-gray-400">24 files</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-600 rounded-lg hover:bg-gray-500 cursor-pointer">
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              </svg>
              <div>
                <p className="text-white font-medium">PDFs</p>
                <p className="text-xs text-gray-400">18 files</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-600 rounded-lg hover:bg-gray-500 cursor-pointer">
              <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              </svg>
              <div>
                <p className="text-white font-medium">Audio</p>
                <p className="text-xs text-gray-400">12 files</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-600 rounded-lg hover:bg-gray-500 cursor-pointer">
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              </svg>
              <div>
                <p className="text-white font-medium">Images</p>
                <p className="text-xs text-gray-400">35 files</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PlatformSettings: FC = (): ReactElement => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold text-gray-200 mb-4">Platform Settings</h2>
    <div className="bg-gray-800 p-4 rounded-lg">
       <div className="h-96 bg-gray-700 rounded-md flex items-center justify-center">
        <Settings className="w-12 h-12 text-gray-500" />
        <p className="text-gray-500 ml-4">Platform settings form will be displayed here</p>
      </div>
    </div>
  </div>
);


type AdminSection = 'dashboard' | 'users' | 'content' | 'settings';

export default function AdminPage(): ReactElement {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  const renderSection = (): ReactElement => {
    switch (activeSection) {
      case 'dashboard':
        return <AnalyticsDashboard />;
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentManagement />;
      case 'settings':
        return <PlatformSettings />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  const NavItem = ({ section, icon: Icon, label }: { section: AdminSection, icon: React.ElementType, label: string }): ReactElement => (
    <button
      onClick={(): void => setActiveSection(section)}
      className={`flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
        activeSection === section
          ? 'bg-blue-600 text-white'
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <div className="flex items-center mb-8">
          <Activity className="w-8 h-8 text-blue-500" />
          <h1 className="ml-3 text-xl font-bold">Admin Panel</h1>
        </div>
        <nav>
          <NavItem section="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem section="users" icon={Users} label="User Management" />
          <NavItem section="content" icon={Upload} label="Content Management" />
          <NavItem section="settings" icon={Settings} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>
      </main>
    </div>
  );
}