export default function WorkerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Worker Dashboard</h1>
        <p className="text-zinc-500 mt-1">Find jobs and manage your work</p>
      </div>
      
      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
        <p className="text-zinc-600">
          This is the worker-specific dashboard page. You can customize this to display available jobs,
          active bids, and worker-specific metrics.
        </p>
      </div>
    </div>
  );
} 