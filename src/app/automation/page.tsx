import CommandCenter from '@/components/automation/CommandCenter'
import Header from '@/components/layout/Header'

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <CommandCenter />
    </div>
  )
}