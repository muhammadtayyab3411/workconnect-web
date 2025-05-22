import { redirect } from 'next/navigation';

export default function WorkerDashboard() {
  redirect('/dashboard/worker/jobs');
} 