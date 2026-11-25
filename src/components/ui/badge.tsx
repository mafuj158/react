import { DIFFICULTY_COLORS } from '../../constants';

type DifficultyKey = keyof typeof DIFFICULTY_COLORS;

interface BadgeProps {
  label: string;
  variant?: DifficultyKey | 'default' | 'info';
  className?: string;
}

export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  const colorClass = variant in DIFFICULTY_COLORS
    ? DIFFICULTY_COLORS[variant as DifficultyKey]
    : 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] font-mono text-[10px] font-semibold uppercase tracking-wider border ${colorClass} ${className}`}>
      {label}
    </span>
  );
}
export default Badge;
