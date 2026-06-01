import { useEffect, useState } from 'react';
import api from '../api/axios.js';
import LeadTable from '../components/LeadTable.jsx';
import LeadFilters from '../components/LeadFilters.jsx';
import Pagination from '../components/Pagination.jsx';
import CreateLeadModal from '../components/CreateLeadModal.jsx';
import toast from 'react-hot-toast';

const initialFilters = {
  page:    1,
  limit:   10,
  search:  '',
  status:  '',
  source:  '',
  sort_by: 'created_at',
  order:   'desc',
};

const Leads = () => {
  const [leads, setLeads]             = useState([]);
  const [pagination, setPagination]   = useState(null);
  const [filters, setFilters]         = useState(initialFilters);
  const [loading, setLoading]         = useState(true);
  const [showCreate, setShowCreate]   = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      );
      const res = await api.get('/leads', { params });
      setLeads(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  return (
    <div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leads</h1>
          <p className="text-slate-500 text-sm mt-1">
            {pagination ? `${pagination.total} total leads` : ''}
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="px-5 py-2 bg-sky-500 text-white rounded-xl text-sm font-semibold hover:bg-sky-600 transition"
        >
          + Create Lead
        </button>
      </div>

      <LeadFilters filters={filters} onChange={setFilters} />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-400 animate-pulse">Loading leads...</p>
          </div>
        ) : (
          <>
            <LeadTable leads={leads} onUpdated={fetchLeads} />
            {pagination && pagination.total_pages > 1 && (
              <Pagination
                pagination={pagination}
                onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
              />
            )}
          </>
        )}
      </div>

      {showCreate && (
        <CreateLeadModal
          onClose={() => setShowCreate(false)}
          onCreated={fetchLeads}
        />
      )}

    </div>
  );
};

export default Leads;