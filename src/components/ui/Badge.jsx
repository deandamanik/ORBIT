export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  dot = false,
  ...props
}) {
  const variants = {
    // 4 Customer Segments from Figma Design System
    'high-value': 'bg-segment-high-bg text-segment-high border-segment-high-border',
    'loyal': 'bg-segment-loyal-bg text-segment-loyal border-segment-loyal-border',
    'promising': 'bg-segment-promising-bg text-segment-promising border-segment-promising-border',
    'at-risk': 'bg-segment-risk-bg text-segment-risk border-segment-risk-border',

    // General status
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-brand-50 text-brand-700 border-brand-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const dotColors = {
    'high-value': 'bg-segment-high',
    'loyal': 'bg-segment-loyal',
    'promising': 'bg-segment-promising',
    'at-risk': 'bg-segment-risk',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-brand-600',
    neutral: 'bg-slate-400',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border select-none transition-colors ${
        variants[variant] || variants.neutral
      } ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColors[variant] || dotColors.neutral
          }`}
        />
      )}
      {children}
    </span>
  );
}
