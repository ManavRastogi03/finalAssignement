const DashboardCard = ({ title, value, icon, color }) => {
  const colorStyles = {
    blue:   'bg-blue-50 border-blue-200 text-blue-600',
    green:  'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`rounded-xl border p-6 flex items-center gap-4 shadow-sm ${style}`}>
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-sm font-medium opacity-70">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;