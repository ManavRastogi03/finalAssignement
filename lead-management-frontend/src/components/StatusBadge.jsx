const statusStyles = {
  new:             'bg-blue-100 text-blue-700',
  contacted:       'bg-yellow-100 text-yellow-700',
  visit_scheduled: 'bg-purple-100 text-purple-700',
  closed:          'bg-green-100 text-green-700',
  lost:            'bg-red-100 text-red-700',
};

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || 'bg-gray-100 text-gray-700';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${style}`}>
      {status?.replace('_', ' ')}
    </span>
  );
};

export default StatusBadge;