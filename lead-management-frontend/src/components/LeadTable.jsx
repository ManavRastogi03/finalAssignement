import { useState } from 'react';
import StatusBadge from './StatusBadge.jsx';
import UpdateStatusModal from './UpdateStatusModal.jsx';

const LeadTable = ({ leads, onUpdated }) => {
  const [selectedLead, setSelectedLead] = useState(null);

  if (leads.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-lg font-medium">No leads found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">

          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Assigned To</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead, idx) => (
              <tr
                key={lead.id}
                className={`border-t border-slate-100 hover:bg-slate-50 transition ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                <td className="px-4 py-3 text-slate-400">{lead.id}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{lead.full_name}</td>
                <td className="px-4 py-3 text-slate-600">{lead.phone}</td>
                <td className="px-4 py-3 text-slate-600">{lead.email || '—'}</td>
                <td className="px-4 py-3 capitalize text-slate-600">
                  {lead.source?.replace('_', ' ') || '—'}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-slate-600">{lead.assigned_to || '—'}</td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(lead.created_at).toLocaleDateString('en-IN', {
                    day:   '2-digit',
                    month: 'short',
                    year:  'numeric',
                  })}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="px-3 py-1 text-xs rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 transition font-medium"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {selectedLead && (
        <UpdateStatusModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdated={onUpdated}
        />
      )}
    </>
  );
};

export default LeadTable;