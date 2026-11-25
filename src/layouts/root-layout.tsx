import { Outlet } from 'react-router-dom';
import { useApp } from '../providers';
import { Sidebar } from '../components/sidebar/sidebar';
import { Header } from '../components/navigation/header';

export function RootLayout() {
  const { sidebarOpen } = useApp();

  return (
    <div className="min-h-screen w-full flex bg-canvas text-primary font-sans">
      <Sidebar />
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-200"
        style={{ marginLeft: sidebarOpen ? '280px' : '0' }}
      >
        <Header />
        <main className="w-full flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
