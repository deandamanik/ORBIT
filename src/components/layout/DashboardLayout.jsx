import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-surface-ground">
      {/* Sidebar (Fixed width 240px) */}
      <Sidebar />

      {/* Main App Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />

        {/* Content Area with comfortable responsive breathing room */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
