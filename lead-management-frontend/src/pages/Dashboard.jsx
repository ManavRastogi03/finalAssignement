import { useEffect, useState } from 'react';
import api from '../api/axios.js';
import DashboardCard from '../components/DashboardCard.jsx';
import { Users, CalendarDays, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const res = await api.get('/dashboard');
      setMetrics(res.data.data);
    } catch (err) {
      console.error('Failed to fetch dashboard metrics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400 text-lg animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of all leads</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <DashboardCard
          title="Total Leads"
          value={metrics.total_leads}
         icon={<Users size={28} />}
          color="blue"
        />
        <DashboardCard
          title="Today's Leads"
          value={metrics.today_leads}
        icon={<CalendarDays size={28} />}
          color="green"
        />
        <DashboardCard
          title="Closed Leads"
          value={metrics.leads_by_status.find((s) => s.status === 'closed')?.count || 0}
        icon={<CheckCircle size={28} />}
          color="purple"
        />
        <DashboardCard
          title="Lost Leads"
          value={metrics.leads_by_status.find((s) => s.status === 'lost')?.count || 0}
        icon={<XCircle size={28} />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-base font-bold text-slate-800 mb-4">Leads by Status</h2>
          <div className="flex flex-col gap-3">
            {metrics.leads_by_status.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <span className="text-sm capitalize text-slate-600">
                  {item.status.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-sky-500 h-2 rounded-full"
                      style={{
                        width: `${Math.round((item.count / metrics.total_leads) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 w-6 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-base font-bold text-slate-800 mb-4">Leads by Source</h2>
          <div className="flex flex-col gap-3">
            {metrics.leads_by_source.map((item) => (
              <div key={item.source} className="flex items-center justify-between">
                <span className="text-sm capitalize text-slate-600">
                  {item.source.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{
                        width: `${Math.round((item.count / metrics.total_leads) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 w-6 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;