interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
  className?: string;
  color?: string;
}

export function ProgressBar({ value, max, showLabel = true, className = '', color = 'bg-blue-500' }: ProgressBarProps) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-xs font-mono text-zinc-500 mb-1">
          <span>{value} / {max}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="h-1.5 rounded-[4px] bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <div
          className={`h-full rounded-[4px] ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
export default ProgressBar;
