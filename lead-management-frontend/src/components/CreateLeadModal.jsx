import { useState } from 'react';
import api from '../api/axios.js';
import toast from 'react-hot-toast';

const initialForm = {
  full_name:   '',
  phone:       '',
  email:       '',
  source:      '',
  status:      'new',
  assigned_to: '',
};

const CreateLeadModal = ({ onClose, onCreated }) => {
  const [form, setForm]       = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post('/leads', form);
      toast.success('Lead created successfully!');
      onCreated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Create New Lead</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Manav Rastogi"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="manavrastogi501@gmail.com"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">
                Source
              </label>
              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="">Select Source</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="walk_in">Walk In</option>
                <option value="social_media">Social Media</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="visit_scheduled">Visit Scheduled</option>
                <option value="closed">Closed</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Assigned To
            </label>
            <input
              type="text"
              name="assigned_to"
              value={form.assigned_to}
              onChange={handleChange}
              placeholder="Trainer name"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !form.full_name || !form.phone}
            className="flex-1 px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition text-sm font-semibold disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Lead'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateLeadModal;