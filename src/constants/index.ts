export const APP_NAME = 'ReactMastery';
export const APP_VERSION = '1.0.0';
export const LOCAL_STORAGE_KEY = 'reactmastery_progress';

export const DIFFICULTY_COLORS = {
  beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  advanced: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  basic: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  hard: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
} as const;

export const MODULE_ACCENTS = [
  { text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', badge: 'bg-sky-500' },
  { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', badge: 'bg-amber-500' },
  { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', badge: 'bg-cyan-500' },
  { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', badge: 'bg-indigo-500' },
  { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', badge: 'bg-violet-500' },
  { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', badge: 'bg-emerald-500' },
  { text: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', badge: 'bg-teal-500' },
  { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', badge: 'bg-blue-500' },
] as const;
