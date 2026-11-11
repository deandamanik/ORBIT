export default function Card({
  children,
  className = '',
  padding = 'p-6',
  header,
  footer,
  ...props
}) {
  return (
    <div
      className={`bg-surface-card border border-border-subtle rounded-2xl shadow-card overflow-hidden transition-shadow duration-200 ${className}`}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-border-subtle bg-slate-50/50">
          {header}
        </div>
      )}
      <div className={padding}>{children}</div>
      {footer && (
        <div className="px-6 py-3 border-t border-border-subtle bg-slate-50/50">
          {footer}
        </div>
      )}
    </div>
  );
}
