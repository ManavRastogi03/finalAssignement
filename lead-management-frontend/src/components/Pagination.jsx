const Pagination = ({ pagination, onPageChange }) => {
  const { page, total_pages, total, limit } = pagination;

  const from = (page - 1) * limit + 1;
  const to   = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold">{from}</span> to{' '}
        <span className="font-semibold">{to}</span> of{' '}
        <span className="font-semibold">{total}</span> leads
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 text-sm rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-200 transition"
        >
          ← Prev
        </button>
        {Array.from({ length: total_pages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === total_pages || Math.abs(p - page) <= 1)
          .reduce((acc, p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) {
              acc.push('...');
            }
            acc.push(p);
            return acc;
          }, [])
          .map((p, idx) =>
            p === '...' ? (
              <span key={idx} className="px-3 py-2 text-sm text-slate-400">...</span>
            ) : (
              <button
                key={idx}
                onClick={() => onPageChange(p)}
                className={`px-4 py-2 text-sm rounded-lg border transition ${
                  p === page
                    ? 'bg-sky-500 text-white border-sky-500'
                    : 'border-slate-300 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            )
          )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === total_pages}
          className="px-4 py-2 text-sm rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-200 transition"
        >
          Next →
        </button>
      </div>

    </div>
  );
};

export default Pagination;