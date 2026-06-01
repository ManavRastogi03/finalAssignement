import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const LeadFilters = ({ filters, onChange }) => {
  const [searchInput, setSearchInput] = useState(filters.search);

  const debouncedSearch = useDebouncedCallback((value) => {
    onChange({ ...filters, search: value, page: 1 });
  }, 500);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  return (
    <div className="flex flex-wrap gap-3 mb-6">

      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search by name or phone..."
        className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 w-64"
      />

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <option value="">All Status</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="visit_scheduled">Visit Scheduled</option>
        <option value="closed">Closed</option>
        <option value="lost">Lost</option>
      </select>

      <select
        name="source"
        value={filters.source}
        onChange={handleChange}
        className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <option value="">All Sources</option>
        <option value="website">Website</option>
        <option value="referral">Referral</option>
        <option value="walk_in">Walk In</option>
        <option value="social_media">Social Media</option>
        <option value="other">Other</option>
      </select>

      <select
        name="sort_by"
        value={filters.sort_by}
        onChange={handleChange}
        className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <option value="created_at">Sort by Date</option>
        <option value="full_name">Sort by Name</option>
        <option value="status">Sort by Status</option>
      </select>

      <select
        name="order"
        value={filters.order}
        onChange={handleChange}
        className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>

    </div>
  );
};

export default LeadFilters;