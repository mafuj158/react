import type { UserProgress } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  bookmarks: [],
  notes: {},
  quizResults: {},
  interviewSessions: [],
  codingChallengeProgress: {},
  theme: 'dark',
  lastVisited: [],
  streak: 0,
  lastStreakDate: '',
};

export const storageService = {
  getProgress(): UserProgress {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return { ...DEFAULT_PROGRESS };
      return { ...DEFAULT_PROGRESS, ...JSON.parse(stored) };
    } catch {
      return { ...DEFAULT_PROGRESS };
    }
  },

  saveProgress(progress: UserProgress): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  },

  completeLesson(lessonId: string): void {
    const progress = this.getProgress();
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons = [...progress.completedLessons, lessonId];
      this.updateStreak(progress);
      this.saveProgress(progress);
    }
  },

  toggleBookmark(lessonId: string): boolean {
    const progress = this.getProgress();
    const idx = progress.bookmarks.indexOf(lessonId);
    if (idx === -1) {
      progress.bookmarks = [...progress.bookmarks, lessonId];
    } else {
      progress.bookmarks = progress.bookmarks.filter((b) => b !== lessonId);
    }
    this.saveProgress(progress);
    return idx === -1;
  },

  saveNote(lessonId: string, note: string): void {
    const progress = this.getProgress();
    progress.notes = { ...progress.notes, [lessonId]: note };
    this.saveProgress(progress);
  },

  addLastVisited(lessonId: string): void {
    const progress = this.getProgress();
    const filtered = progress.lastVisited.filter((id) => id !== lessonId);
    progress.lastVisited = [lessonId, ...filtered].slice(0, 10);
    this.saveProgress(progress);
  },

  updateStreak(progress: UserProgress): void {
    const today = new Date().toDateString();
    if (progress.lastStreakDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (progress.lastStreakDate === yesterday) {
      progress.streak = (progress.streak || 0) + 1;
    } else {
      progress.streak = 1;
    }
    progress.lastStreakDate = today;
  },

  setTheme(theme: 'dark' | 'light'): void {
    const progress = this.getProgress();
    progress.theme = theme;
    this.saveProgress(progress);
  },

  saveQuizResult(
    lessonId: string,
    score: number,
    total: number,
    answers: Record<string, string | number>
  ): void {
    const progress = this.getProgress();
    progress.quizResults = {
      ...progress.quizResults,
      [lessonId]: { lessonId, score, total, answers, completedAt: new Date().toISOString() },
    };
    this.saveProgress(progress);
  },
};
