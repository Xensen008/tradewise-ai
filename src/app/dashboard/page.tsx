import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add your dashboard content here */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
          <p className="text-gray-600">Your investment summary will appear here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
          <p className="text-gray-600">AI-powered market analysis will appear here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">Your recent trading activity will appear here.</p>
        </div>
      </div>
    </div>
  )
} 