import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'danger'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition text-sm flex items-center justify-center gap-2 disabled:opacity-50'
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/20',
      outline: 'border border-slate-700 text-slate-200 hover:bg-slate-800',
      ghost: 'text-slate-400 hover:text-white hover:bg-slate-800/50',
      danger: 'bg-red-600 text-white hover:bg-red-500',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
