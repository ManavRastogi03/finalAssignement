import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Leads from './pages/Leads.jsx';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans">

      <nav className="bg-slate-800 px-8 py-4 flex items-center gap-6">
        <span className="text-white font-bold text-xl mr-auto">
          FitLeads
        </span>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-sky-400 font-semibold'
              : 'text-slate-300 hover:text-white transition'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/leads"
          className={({ isActive }) =>
            isActive
              ? 'text-sky-400 font-semibold'
              : 'text-slate-300 hover:text-white transition'
          }
        >
          Leads
        </NavLink>
      </nav>

      <div className="p-8">
        <Routes>
          <Route path="/"      element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;