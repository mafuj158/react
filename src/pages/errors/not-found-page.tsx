import { Link } from 'react-router-dom';
import { Terminal, ArrowLeft, Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-canvas text-primary font-sans">
      <div className="w-full max-w-md p-8 rounded-[var(--radius)] border border-subtle bg-card text-center space-y-4 shadow-lg">
        <div className="w-12 h-12 rounded-[var(--radius)] bg-accent-subtle border border-primary/20 text-accent-primary flex items-center justify-center mx-auto">
          <Terminal size={24} />
        </div>
        <div className="text-5xl font-black font-mono tracking-tight text-primary">
          404
        </div>
        <h1 className="text-lg font-bold text-primary">Route Not Found</h1>
        <p className="text-xs text-secondary">
          The requested route does not exist in the curriculum routing tree.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius)] bg-accent-primary hover:opacity-90 text-white font-medium text-xs transition-opacity"
          >
            <Home size={14} />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius)] border border-subtle hover:bg-card-subtle text-secondary hover:text-primary font-medium text-xs transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default NotFoundPage;
