export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Client Dashboard</h1>
        <p className="text-zinc-500 mt-1">Manage your projects and find workers</p>
      </div>
      
      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
        <p className="text-zinc-600">
          This is the client-specific dashboard page. You can customize this to display client-specific statistics, 
          job postings, and worker applications.
        </p>
      </div>
    </div>
  );
} 