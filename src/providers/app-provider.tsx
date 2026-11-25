import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { UserProgress } from '../types';
import { storageService } from '../services/storage';

interface AppContextType {
  progress: UserProgress;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  completeLesson: (id: string) => void;
  toggleBookmark: (id: string) => boolean;
  saveNote: (id: string, note: string) => void;
  isCompleted: (id: string) => boolean;
  isBookmarked: (id: string) => boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => storageService.getProgress());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const refresh = useCallback(() => setProgress(storageService.getProgress()), []);

  const theme = progress.theme;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    storageService.setTheme(next);
    refresh();
  }, [theme, refresh]);

  const completeLesson = useCallback(
    (id: string) => {
      storageService.completeLesson(id);
      refresh();
    },
    [refresh]
  );

  const toggleBookmark = useCallback(
    (id: string) => {
      const added = storageService.toggleBookmark(id);
      refresh();
      return added;
    },
    [refresh]
  );

  const saveNote = useCallback(
    (id: string, note: string) => {
      storageService.saveNote(id, note);
      refresh();
    },
    [refresh]
  );

  const isCompleted = useCallback(
    (id: string) => progress.completedLessons.includes(id),
    [progress]
  );
  const isBookmarked = useCallback(
    (id: string) => progress.bookmarks.includes(id),
    [progress]
  );

  return (
    <AppContext.Provider
      value={{
        progress,
        theme,
        toggleTheme,
        completeLesson,
        toggleBookmark,
        saveNote,
        isCompleted,
        isBookmarked,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
