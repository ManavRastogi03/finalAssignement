import { useState } from 'react';
import api from '../api/axios.js';
import toast from 'react-hot-toast';

const STATUSES = ['new', 'contacted', 'visit_scheduled', 'closed', 'lost'];

const UpdateStatusModal = ({ lead, onClose, onUpdated }) => {
  const [status, setStatus] = useState(lead.status);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await api.put(`/leads/${lead.id}/status`, { status });
      toast.success('Status updated successfully');
      onUpdated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Update Lead Status</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-slate-500">Lead</p>
          <p className="font-semibold text-slate-800">{lead.full_name}</p>
          <p className="text-sm text-slate-500">{lead.phone}</p>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-3 rounded-xl text-sm font-medium capitalize border transition text-left ${
                status === s
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading || status === lead.status}
            className="flex-1 px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition text-sm font-semibold disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Status'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UpdateStatusModal;