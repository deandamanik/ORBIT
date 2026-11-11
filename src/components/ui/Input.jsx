import { useId } from 'react';

export default function Input({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  wrapperClassName = '',
  id,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-700 select-none"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={`w-full bg-surface-card border ${
            error
              ? 'border-rose-500 focus:ring-rose-500/20'
              : 'border-border-input focus:border-brand-600 focus:ring-brand-500/20'
          } rounded-lg text-sm text-slate-900 placeholder:text-slate-400 h-[42px] px-3.5 ${
            Icon ? 'pl-9' : ''
          } transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p id={errorId} className="text-xs text-rose-500">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="text-xs text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
